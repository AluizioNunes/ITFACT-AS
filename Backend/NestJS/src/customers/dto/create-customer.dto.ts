import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  tenant_id: string;

  @IsEnum(['individual', 'company'])
  type: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  address?: any;

  @IsOptional()
  @IsBoolean()
  whatsapp_optin?: boolean;
}
