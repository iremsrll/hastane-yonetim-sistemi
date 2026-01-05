import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('hosp_doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  doctorId: number;

  @Column()
  doctorFullName: string; 

  @Column()
  specialization: string; 

  @ManyToOne(() => Department, (dept) => dept.doctors)
  department: Department;

  @OneToMany(() => Appointment, (appo) => appo.doctor)
  appointments: Appointment[];
}