import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { NotFoundException } from '@nestjs/common';

describe('DoctorsService (Birim Testi)', () => {
  let service: DoctorsService;
  let repository;

  const mockDoctorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: mockDoctorRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
    repository = module.get(getRepositoryToken(Doctor));
  });

  it('hekim servisi tanımlanmış olmalı', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('yeni bir doktor kaydı oluşturup kaydetmeli', async () => {
      const dto = { doctorFullName: 'Dr. Ahmet', specialization: 'Göz', departmentId: 1 };
      repository.save.mockReturnValue(Promise.resolve({ doctorId: 1, ...dto }));

      const result = await service.create(dto);
      expect(result).toHaveProperty('doctorId');
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('doktor bulunamadığında hata fırlatmalı', async () => {
      repository.findOne.mockReturnValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});