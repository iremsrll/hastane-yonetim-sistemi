import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionsService } from './prescriptions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;
  let repository;

  const mockPrescRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionsService,
        { provide: getRepositoryToken(Prescription), useValue: mockPrescRepo },
      ],
    }).compile();

    service = module.get<PrescriptionsService>(PrescriptionsService);
    repository = module.get(getRepositoryToken(Prescription));
  });

  it('yeni reçete oluşturmalı', async () => {
    const dto = { medications: 'Aspirin', appointmentId: 1, notes: 'Tok karnına' };
    repository.create.mockReturnValue(dto);
    repository.save.mockReturnValue({ prescId: 1, ...dto });

    const result = await service.create(dto);
    expect(result.prescId).toBe(1);
    expect(repository.save).toHaveBeenCalled();
  });
});