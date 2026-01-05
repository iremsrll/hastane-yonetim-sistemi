import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async create(dto: CreatePatientDto) {
    const newPatient = this.patientRepo.create(dto);
    return await this.patientRepo.save(newPatient);
  }

  async findAll() {
    return await this.patientRepo.find({ relations: ['appointments'] });
  }

  async findOne(id: number) {
    const patient = await this.patientRepo.findOne({ where: { patientId: id } });
    if (!patient) {
      throw new NotFoundException(`Sistemde #${id} numaralı hasta kaydı bulunmuyor.`);
    }
    return patient;
  }
  
  async update(id: number, dto: any) {
    const patient = await this.findOne(id);
    return await this.patientRepo.save({ ...patient, ...dto });
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    return await this.patientRepo.remove(patient);
  }
}