import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const auth = req.headers['authorization'] as string | undefined
    if (!auth || !auth.startsWith('Bearer ')) throw new UnauthorizedException('Token ausente')
    const token = auth.slice(7)
    try {
      const payload = await this.jwt.verifyAsync(token)
      req.user = payload
      return true
    } catch {
      throw new UnauthorizedException('Token inválido')
    }
  }
}
