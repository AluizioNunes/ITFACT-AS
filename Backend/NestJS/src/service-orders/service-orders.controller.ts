import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ServiceOrdersService } from './service-orders.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-orders')
@UseGuards(JwtAuthGuard)
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Post()
  create(@Body() createServiceOrderDto: CreateServiceOrderDto) {
    return this.serviceOrdersService.create(createServiceOrderDto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.serviceOrdersService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceOrdersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceOrderDto: UpdateServiceOrderDto) {
    return this.serviceOrdersService.update(id, updateServiceOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceOrdersService.remove(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.serviceOrdersService.updateStatus(id, status);
  }
}
