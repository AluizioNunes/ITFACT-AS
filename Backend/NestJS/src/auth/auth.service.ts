import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.userAccount.findFirst({ where: { email } })
    if (!user || !user.is_active) throw new UnauthorizedException('Credenciais inválidas')
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) throw new UnauthorizedException('Credenciais inválidas')
    return user
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password)
    const payload = { sub: user.id, tenantId: user.tenant_id }
    const accessToken = await this.jwt.signAsync(payload, { expiresIn: '15m' })
    const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' })
    return { accessToken, refreshToken }
  }

  async refresh(token: string) {
    const decoded = await this.jwt.verifyAsync(token).catch(() => null)
    if (!decoded) throw new UnauthorizedException('Refresh inválido')
    const payload = { sub: decoded.sub, tenantId: decoded.tenantId }
    const accessToken = await this.jwt.signAsync(payload, { expiresIn: '15m' })
    return { accessToken }
  }
}
