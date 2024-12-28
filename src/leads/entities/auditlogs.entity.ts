import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Lead } from './lead.entity';


@Entity('Audit_Logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lead, (lead) => lead.auditLogs)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column({ type: 'varchar' })
  actionType: string; 

  @Column({ type: 'varchar'})
  updatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}