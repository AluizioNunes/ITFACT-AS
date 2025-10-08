import { IsString, IsUUID, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  tenant_id: string;

  @IsUUID()
  customer_id: string;

  @IsString()
  plate: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  engine?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsInt()
  mileage?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
