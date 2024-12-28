import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn} from 'typeorm';
import { AuditLog } from './auditlogs.entity';




export enum LeadType {
    NEW = 'New',
    URGENT = 'Urgent',
    PRIORITY = "Priority",
    OTHER = 'Other',
  }
  
  export enum LeadStatus {
    NEW = 'New',
    CONTACTED = 'Contacted',
    IN_PROGRESS = 'InProgress',
    COMPLETED = 'Completed',
    NEGOTIATION='Negotiation'
  }
  @Entity('Leads')

export class Lead {

  @PrimaryGeneratedColumn("uuid")  // Use UUID type
  id: string ; 

  @Column({type:'varchar',length:100})
  title: string;

  @Column({ type: 'enum', enum: LeadType, default: LeadType.NEW })
  type: LeadType;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @Column()
  customer: string;

  @Column({ nullable: true,default:'' })
  leadSource: string;

  @Column({ nullable: true,default:'' })
  client: string;

  @Column({ nullable: true ,default:''})
  company: string;
  @Column({ type: 'varchar', unique: true})
  phone: string;
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  paymentMethod: string;
  @Column({ default:'INR'})
  currency: string;

  @Column({ type: 'decimal'})
  budget: number;

  @Column({ type: 'decimal'})
  deposit: number;

  @Column({ nullable: true,default:'' })
  assignedAgent:string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => AuditLog, (auditLog) => auditLog.lead)
  auditLogs: AuditLog[];
   
}