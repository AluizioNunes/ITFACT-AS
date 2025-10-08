import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsEnum(['basic', 'professional', 'enterprise', 'suite'])
  plan: string;

  @IsOptional()
  @IsEnum(['active', 'suspended', 'trial'])
  status?: string;
}
