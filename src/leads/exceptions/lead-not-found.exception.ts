import { HttpException, HttpStatus } from '@nestjs/common';

export class LeadNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Lead with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
