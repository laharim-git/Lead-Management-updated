import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { ConflictException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadType, LeadStatus, Lead } from './entities/lead.entity';  // Ensure enum imports

describe('LeadsController', () => {
  let controller: LeadsController;
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        LeadsService,
        {
          provide: LeadsService,
          useValue: {
            create: jest.fn(),
            getAllLeads: jest.fn(),
            getLeadById: jest.fn(),
            update: jest.fn(),
            deleteLead: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the created lead', async () => {
      const createLeadDto: CreateLeadDto = {
        title: 'Test Lead',
        type: LeadType.NEW, // Using enum value for type
        status: LeadStatus.NEW, // Using enum value for status
        leadSource: 'justdial', // Optional field
        customer: 'Test Customer',
        phone: '1234567890',
        email: 'test@lead.com',
        paymentMethod: 'Credit Card',
        currency: 'USD',
        budget: 1000,
        deposit: 500,
      };

      // Mock Lead object with UUID
      const lead: Lead = {
        id: '550e8400-e29b-41d4-a716-446655440000', // Mock UUID ID
        title: 'Test Lead',
        type: LeadType.NEW,
        status: LeadStatus.NEW,
        customer: 'Test Customer',
        leadSource: 'justdial', // Optional field
        client: 'Test Client', // Optional field
        company: 'Test Company', // Optional field
        phone: '1234567890',
        email: 'test@lead.com',
        paymentMethod: 'Credit Card',
        currency: 'USD',
        budget: 1000,
        deposit: 500,
        assignedAgent: 'Agent A', // Optional field
        createdAt: new Date(), // Mock Date
        updatedAt: new Date(), // Mock Date
        auditLogs: [], // Mock empty array
      };

      // Mock the resolved value of the 'create' method to return the lead
      jest.spyOn(service, 'create').mockResolvedValue(lead);

      // Call the controller create method
      const result = await controller.create(createLeadDto);

      // Assert that the result matches the lead object
      expect(result).toEqual(lead);
    });

    it('should throw ConflictException if lead already exists', async () => {
      const createLeadDto: CreateLeadDto = {
        title: 'Test Lead',
        type: LeadType.NEW, // Using enum value for type
        status: LeadStatus.NEW, // Using enum value for status
        leadSource: 'justdial',
        customer: 'Test Customer',
        phone: '1234567890',
        email: 'test@lead.com',
        paymentMethod: 'Credit Card',
        currency: 'USD',
        budget: 1000,
        deposit: 500,
      };

      jest.spyOn(service, 'create').mockRejectedValue(new ConflictException('Duplicate data found'));

      try {
        await controller.create(createLeadDto);
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toContain('Duplicate data found');
      }
    });
  });

});