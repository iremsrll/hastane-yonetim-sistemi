import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Prescription } from '../../prescriptions/entities/prescription.entity';

@Entity('hosp_appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  appoId: number;

  @Column({ type: 'datetime' })
  appointmentDate: Date;

  @Column({ default: 'Active' })
  status: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @OneToOne(() => Prescription, (presc) => presc.appointment)
  prescription: Prescription;
}