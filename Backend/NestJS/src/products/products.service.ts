import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  list(params: { q?: string } = {}) {
    const { q } = params
    return this.prisma.product.findMany({
      where: q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { sku: { contains: q, mode: 'insensitive' } }] } : undefined,
      orderBy: { created_at: 'desc' },
      take: 100,
    })
  }

  get(id: string) {
    return this.prisma.product.findUnique({ where: { id } })
  }

  async create(data: any) {
    return this.prisma.product.create({ data })
  }

  async update(id: string, data: any) {
    const exists = await this.prisma.product.findUnique({ where: { id } })
    if (!exists) throw new NotFoundException('Produto não encontrado')
    return this.prisma.product.update({ where: { id }, data })
  }

  async remove(id: string) {
    const exists = await this.prisma.product.findUnique({ where: { id } })
    if (!exists) throw new NotFoundException('Produto não encontrado')
    await this.prisma.product.delete({ where: { id } })
    return { ok: true }
  }
}
