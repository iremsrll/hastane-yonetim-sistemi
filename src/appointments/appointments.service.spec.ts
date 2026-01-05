import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { NotFoundException } from '@nestjs/common';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let repository;

  const mockAppoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: getRepositoryToken(Appointment), useValue: mockAppoRepo },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    repository = module.get(getRepositoryToken(Appointment));
  });

  it('servis tanımlı olmalı', () => {
    expect(service).toBeDefined();
  });

  it('tüm randevuları listelemeli', async () => {
    repository.find.mockReturnValue([]);
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('randevu bulunamadığında hata fırlatmalı', async () => {
    repository.findOne.mockReturnValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });
});