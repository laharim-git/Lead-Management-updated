import { HttpException, HttpStatus } from '@nestjs/common';

export class LeadAssignmentException extends HttpException {
  constructor(leadId: string, message: string) {
    super(`Failed to assign lead with ID ${leadId}: ${message}`, HttpStatus.BAD_REQUEST);
  }
}