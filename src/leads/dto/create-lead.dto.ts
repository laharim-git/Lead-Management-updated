import { IsString, IsEnum, IsOptional, IsEmail, IsPhoneNumber, IsDecimal } from 'class-validator';
import { LeadStatus, LeadType } from '../entities/lead.entity';

export class CreateLeadDto {
  @IsString()
  title: string;

  @IsEnum(LeadType)
  type: LeadType;

  @IsEnum(LeadStatus)
  status: LeadStatus;

  @IsString()
  customer: string;

  @IsString()
  @IsOptional() // Optional field
  leadSource?: string;

  @IsString()
  @IsOptional() // Optional field
  client?: string;

  @IsString()
  @IsOptional() // Optional field
  company?: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  paymentMethod: string;

  @IsString()
  @IsOptional() // Optional field, default can be set to 'INR'
  currency: string = 'INR';  // Default value can be set directly here

  @IsDecimal()
  budget: number;

  @IsDecimal()
  deposit: number;

  @IsString()
  @IsOptional() // Optional field
  assignedAgent?: string;
}