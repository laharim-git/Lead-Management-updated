import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseOperationException extends HttpException {
  constructor(operation: string, errorDetails?: any) {
    super(` operation failed during ${operation}`, HttpStatus.INTERNAL_SERVER_ERROR);
    this.errorDetails = errorDetails;
  }

  private errorDetails: any;
}
