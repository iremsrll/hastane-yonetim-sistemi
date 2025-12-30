import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('hosp_prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  prescId: number;

  @Column()
  medications: string;

  @Column({ nullable: true })
  notes: string;

  @OneToOne(() => Appointment, (appo) => appo.prescription)
  @JoinColumn() 
  appointment: Appointment;
}