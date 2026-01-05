import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescRepo: Repository<Prescription>,
  ) {}

  async create(dto: CreatePrescriptionDto) {
    const prescription = this.prescRepo.create({
      medications: dto.medications,
      notes: dto.notes,
      appointment: { appoId: dto.appointmentId } as any,
    });
    return await this.prescRepo.save(prescription);
  }

  async findAll() {
    return await this.prescRepo.find({ relations: ['appointment'] });
  }

  async findOne(id: number) {
    const presc = await this.prescRepo.findOne({
      where: { prescId: id },
      relations: ['appointment'],
    });
    if (!presc) throw new NotFoundException(`Reçete kaydı (#${id}) bulunamadı.`);
    return presc;
  }

  async update(id: number, dto: any) {
    const presc = await this.findOne(id);
    return await this.prescRepo.save({ ...presc, ...dto });
  }

  async remove(id: number) {
    const presc = await this.findOne(id);
    return await this.prescRepo.remove(presc);
  }
}