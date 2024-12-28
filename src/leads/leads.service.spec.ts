import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
// import { LeadRepository } from './lead.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
// import { LeadType, LeadStatus, Lead } from './entities/lead.entity';
import { Logger } from '@nestjs/common';
import { LeadStatus, LeadType } from './entities/lead.entity';

describe('LeadsService', () => {
  let service: LeadsService;
  let leadRepositoryMock: any;
  // let mockLogger: Logger;

  beforeEach(async () => {
    // Mock LeadRepository
    leadRepositoryMock= {
      create: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue({}),
      update: jest.fn().mockReturnValue({}),
      remove: jest.fn().mockReturnValue({}),
      // Mock other repository methods as needed
    } 

    

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        Logger,
        {
          provide: 'LeadReposiory',
          useValue: leadRepositoryMock,
        },
       
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  

  it('should throw ConflictException if lead already exists', async () => {
  const createLeadDto =
      {
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
const lead=await service.create(createLeadDto);
expect(lead).toEqual({}); // Expected output (could be more specific depending on your service)
expect(leadRepositoryMock.create).toHaveBeenCalledWith(createLeadDto); // Check that create was called with correct parameters
expect(leadRepositoryMock.save).toHaveBeenCalled();
  }  );  // Mock an existing lead


  it('should throw ConflictException if lead already exists', async () => {
    leadRepositoryMock.findOne.mockResolvedValueOnce({

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
      }


); 
    await expect(service.create({

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
      }



    ))
      .rejects
      .toThrow(ConflictException);  // Assuming your service throws ConflictException if lead exists
  });
});

 