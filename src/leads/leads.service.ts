import { ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { Lead } from "./entities/lead.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm"
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { AssignLeadDto } from "./dto/assign-lead.dto";
import { LeadNotFoundException } from "./exceptions/lead-not-found.exception";
import { DatabaseOperationException } from "./exceptions/databaseexception";
import { LeadAssignmentException } from "./exceptions/lead-assignment.exception";

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,private readonly logger: Logger
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    function extractConflictField(detail: string): string {
      const match = detail.match(/Key \((.*?)\)=/);
      return match ? match[1] : 'unknown field';
    }
    
    try {
      const lead = this.leadRepository.create(createLeadDto);
      return await this.leadRepository.save(lead);
    } catch (error) {
      // Log detailed error information in the terminal
      console.error('Error creating lead:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });if (error.code === '23505') { // PostgreSQL unique constraint violation
        const conflictDetails = extractConflictField(error.detail);
        console.error('Duplicate entry conflict:', conflictDetails);
  
        throw new ConflictException(
          `Duplicate data found. Please enter unique data for ${conflictDetails}.`
        );
      } throw new InternalServerErrorException(
        'An unexpected error occurred while creating the lead. Please try again later.'
      );
    }
  }
  
  
  
  async getAllLeads(): Promise<Lead[]> {
    try{
    return this.leadRepository.find();
    }
    catch (error) {
      
      console.error('Error creating lead:', error);
      throw new HttpException('Error fetching users', 500);

    
    }
  }
  async getLeadById(id: string): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOneBy({ id });
  
      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found.`);
      }
  
      return lead;
    } catch (error) {
      console.error(`Error retrieving lead with ID ${id}:`, error);
  
      if (error instanceof NotFoundException) {
        throw error; // Rethrow specific error for the filter to handle
      }
  
      // Handle unexpected errors
      throw new InternalServerErrorException(
        `Failed to retrieve lead with ID ${id}.`
      );
    }
  }
  
  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    
const lead=await this.leadRepository.findOneBy({id});
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

   
    Object.assign(lead, updateLeadDto);

   
    return this.leadRepository.save(lead);
  }
  async deleteLead(id: string): Promise<void> {
    const lead = await this.leadRepository.findOneBy({ id });
  
    if (!lead) {
      throw new LeadNotFoundException(id);
    }
  
    try {
      await this.leadRepository.delete(id);
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw new DatabaseOperationException('deleting lead', error);
    }
  }
 
  async assignLead(leadId: string, assignLeadDto: AssignLeadDto): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id: leadId } });
  
    if (!lead) {
      throw new LeadNotFoundException(leadId);
    }
  
    // Check if the assigned agent is the same
    if (lead.assignedAgent === assignLeadDto.assignedAgent) {
      throw new LeadAssignmentException(
        leadId,
        `Lead is already assigned to agent ${assignLeadDto.assignedAgent}.`
      );
    }
  
    try {
      // Update the assigned agent
      lead.assignedAgent = assignLeadDto.assignedAgent;
      return await this.leadRepository.save(lead);
    } catch (error) {
      console.error('Error assigning lead:', error);
      throw new LeadAssignmentException(leadId, error.message);
    }
  }
  
 
}