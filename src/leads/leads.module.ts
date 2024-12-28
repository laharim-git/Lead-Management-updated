import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { Lead } from './entities/lead.entity'; 
import { AuditLog } from './entities/auditlogs.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, AuditLog]), 
  ],
  controllers: [LeadsController], 
  providers: [LeadsService,Logger],
})
export class LeadsModule {}