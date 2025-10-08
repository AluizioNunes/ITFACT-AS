import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  list(@Query('q') q?: string) {
    return this.service.list({ q })
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id)
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
