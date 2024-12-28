import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { AssignLeadDto } from './dto/assign-lead.dto';
import { Lead } from './entities/lead.entity';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // Create Lead
  @Post()
  @UsePipes(new ValidationPipe()) // This ensures that validation is triggered on CreateLeadDto
  async create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadsService.create(createLeadDto);
  }

  // Get All Leads
  @Get()
  async getAllLeads(): Promise<Lead[]> {
    return this.leadsService.getAllLeads();
  }

  // Get Lead by ID
  @Get(':id')
  async getLeadById(@Param('id') id: string): Promise<Lead> {
    return this.leadsService.getLeadById(id);
  }

  // Update Lead
  @Put(':id')
  @UsePipes(new ValidationPipe()) // This ensures that validation is triggered on UpdateLeadDto
  async update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<Lead> {
    return this.leadsService.update(id, updateLeadDto);
  }

  // Delete Lead
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content status code for successful deletion
  async deleteLead(@Param('id') id: string): Promise<void> {
    return this.leadsService.deleteLead(id);
  }

  // Assign Lead to Agent
  @Put(':id/assign')
  @UsePipes(new ValidationPipe()) // This ensures that validation is triggered on AssignLeadDto
  async assignLead(
    @Param('id') leadId: string,
    @Body() assignLeadDto: AssignLeadDto,
  ): Promise<Lead> {
    return this.leadsService.assignLead(leadId, assignLeadDto);
  }
}
