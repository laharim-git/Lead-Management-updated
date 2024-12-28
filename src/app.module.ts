import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { LeadsModule } from './leads/leads.module';
import { Lead } from './leads/entities/lead.entity';
import { AuditLog } from './leads/entities/auditlogs.entity';

// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, // Use env variable for host
      port: parseInt(process.env.DATABASE_PORT, 10), // Use env variable for port
      username: process.env.DATABASE_USERNAME, // Use env variable for username
      password: process.env.DATABASE_PASSWORD, // Use env variable for password
      database: process.env.DATABASE_NAME, // Use env variable for database name
      synchronize: false, // Be cautious when setting this to false in production
      entities: [Lead, AuditLog],
    }),
    LeadsModule, // Import your LeadsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
