import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { NotFoundException } from '@nestjs/common';

describe('PatientsService (Birim Testi)', () => {
  let service: PatientsService;
  let repository;

 
  const mockPatientRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get(getRepositoryToken(Patient));
  });

  it('servis tanımlanmış olmalı', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('yeni bir hasta kaydı oluşturmalı', async () => {
      const dto = { patientName: 'Ayşe Yılmaz', identityNumber: '11122233344' };
      repository.create.mockReturnValue(dto);
      repository.save.mockReturnValue(Promise.resolve({ patientId: 1, ...dto }));

      const result = await service.create(dto);
      expect(result).toEqual({ patientId: 1, ...dto });
      expect(repository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('hasta bulunamadığında NotFoundException fırlatmalı', async () => {
      repository.findOne.mockReturnValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });

    it('geçerli ID ile hastayı döndürmeli', async () => {
      const patient = { patientId: 1, patientName: 'Test' };
      repository.findOne.mockReturnValue(patient);
      const result = await service.findOne(1);
      expect(result).toEqual(patient);
    });
  });
});