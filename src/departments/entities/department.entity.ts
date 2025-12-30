import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('hosp_departments')
export class Department {
  @PrimaryGeneratedColumn()
  deptId: number;

  @Column()
  deptName: string; 

  @Column({ nullable: true })
  floorNumber: number; 

  @OneToMany(() => Doctor, (doctor) => doctor.department)
  doctors: Doctor[];
}