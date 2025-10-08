import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

class LoginDto {
  email!: string
  password!: string
}

class RefreshDto {
  refreshToken!: string
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password)
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.auth.refresh(dto.refreshToken)
  }
}
