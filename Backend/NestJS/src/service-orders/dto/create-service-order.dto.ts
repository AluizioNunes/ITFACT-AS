import { IsString, IsEnum, IsOptional, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateServiceOrderDto {
  @IsString()
  tenant_id: string;

  @IsString()
  number: string;

  @IsUUID()
  customer_id: string;

  @IsUUID()
  vehicle_id: string;

  @IsEnum(['draft', 'approved', 'in_service', 'awaiting_parts', 'completed', 'invoiced', 'canceled'])
  status: string;

  @IsOptional()
  @IsDateString()
  promised_date?: string;

  @IsOptional()
  @IsUUID()
  assigned_to?: string;

  @IsOptional()
  @IsEnum(['counter', 'whatsapp', 'api', 'n8n'])
  source?: string;

  @IsOptional()
  @IsNumber()
  total_parts?: number;

  @IsOptional()
  @IsNumber()
  total_labor?: number;

  @IsOptional()
  @IsNumber()
  total_discount?: number;

  @IsOptional()
  @IsNumber()
  total_tax?: number;

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
