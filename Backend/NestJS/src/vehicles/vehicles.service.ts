import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.vehicle.findMany({
      where: { tenant_id: tenantId },
      include: {
        customer: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
