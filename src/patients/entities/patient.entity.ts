import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('hosp_patients')
export class Patient {
  @PrimaryGeneratedColumn()
  patientId: number;

  @Column()
  patientName: string;

  @Column({ unique: true })
  identityNumber: string; 

  @OneToMany(() => Appointment, (appo) => appo.patient)
  appointments: Appointment[];
}