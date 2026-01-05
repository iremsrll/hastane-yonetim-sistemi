import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appoRepo: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const appointment = this.appoRepo.create({
      appointmentDate: dto.appointmentDate,
      patient: { patientId: dto.patientId } as any,
      doctor: { doctorId: dto.doctorId } as any,
    });
    return await this.appoRepo.save(appointment);
  }

  async findAll() {
    return await this.appoRepo.find({
      relations: ['patient', 'doctor', 'prescription'],
    });
  }

  async findOne(id: number) {
    const appo = await this.appoRepo.findOne({
      where: { appoId: id },
      relations: ['patient', 'doctor', 'prescription'],
    });
    if (!appo) throw new NotFoundException(`Randevu kaydı (#${id}) bulunamadı.`);
    return appo;
  }
}