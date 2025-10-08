import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';

@Injectable()
export class ServiceOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceOrderDto: CreateServiceOrderDto) {
    // Calcular totais se não fornecidos
    const totals = await this.calculateTotals(createServiceOrderDto);

    return this.prisma.serviceOrder.create({
      data: {
        ...createServiceOrderDto,
        ...totals,
        open_date: new Date(),
      },
      include: {
        customer: true,
        vehicle: true,
        assignedUser: true,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.serviceOrder.findMany({
      where: { tenant_id: tenantId },
      include: {
        customer: true,
        vehicle: true,
        assignedUser: true,
        items: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const serviceOrder = await this.prisma.serviceOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        vehicle: true,
        assignedUser: true,
        items: true,
        events: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!serviceOrder) {
      throw new NotFoundException(`Service Order with ID ${id} not found`);
    }

    return serviceOrder;
  }

  async update(id: string, updateServiceOrderDto: UpdateServiceOrderDto) {
    const existingOrder = await this.findOne(id);

    const totals = await this.calculateTotals(updateServiceOrderDto);

    return this.prisma.serviceOrder.update({
      where: { id },
      data: {
        ...updateServiceOrderDto,
        ...totals,
      },
      include: {
        customer: true,
        vehicle: true,
        assignedUser: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    const existingOrder = await this.findOne(id);

    const updatedOrder = await this.prisma.serviceOrder.update({
      where: { id },
      data: {
        status,
        close_date: status === 'completed' ? new Date() : existingOrder.close_date,
      },
      include: {
        customer: true,
        vehicle: true,
        assignedUser: true,
      },
    });

    // Criar evento de mudança de status
    await this.prisma.serviceOrderEvent.create({
      data: {
        service_order_id: id,
        event_type: 'status_change',
        payload: {
          from: existingOrder.status,
          to: status,
          timestamp: new Date(),
        },
      },
    });

    return updatedOrder;
  }

  async remove(id: string) {
    return this.prisma.serviceOrder.delete({
      where: { id },
    });
  }

  private async calculateTotals(dto: any) {
    let totalParts = 0;
    let totalLabor = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    // Se houver itens, calcular totais
    if (dto.items) {
      for (const item of dto.items) {
        const subtotal = item.qty * item.unit_price;
        const discount = (subtotal * item.discount) / 100;
        const tax = ((subtotal - discount) * item.tax_rate) / 100;

        if (item.item_type === 'part') {
          totalParts += subtotal - discount + tax;
        } else if (item.item_type === 'labor') {
          totalLabor += subtotal - discount + tax;
        }

        totalDiscount += discount;
        totalTax += tax;
      }
    }

    return {
      total_parts: totalParts,
      total_labor: totalLabor,
      total_discount: totalDiscount,
      total_tax: totalTax,
      total_amount: totalParts + totalLabor,
    };
  }
}
