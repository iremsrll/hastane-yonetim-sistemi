import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async create(dto: CreateDoctorDto) {
    const newDoctor = this.doctorRepo.create({
      doctorFullName: dto.doctorFullName,
      specialization: dto.specialization,
      department: { deptId: dto.departmentId }
    });
    return await this.doctorRepo.save(newDoctor);
  }

  async findAll() {
    return await this.doctorRepo.find({ relations: ['department'] });
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepo.findOne({ 
      where: { doctorId: id },
      relations: ['department', 'appointments'] 
    });
    if (!doctor) {
      throw new NotFoundException(`Belirtilen ID (#${id}) ile eşleşen bir hekim bulunamadı.`);
    }
    return doctor;
  }
}