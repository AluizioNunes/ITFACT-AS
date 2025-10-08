import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import compression from 'compression'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('')
  app.use(helmet({ crossOriginResourcePolicy: false }))
  app.enableCors({ origin: true, credentials: true })
  app.use(compression())
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }),
  )
  const port = process.env.API_CORE_PORT ? Number(process.env.API_CORE_PORT) : 3000
  await app.listen(port, '0.0.0.0')
}
bootstrap()
