import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

describe('DoctorsController', () => {
  let controller: DoctorsController;
  let service: DoctorsService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ doctorId: 1 }),
    create: jest.fn().mockResolvedValue({ doctorId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [{ provide: DoctorsService, useValue: mockService }],
    }).compile();

    controller = module.get<DoctorsController>(DoctorsController);
    service = module.get<DoctorsService>(DoctorsService);
  });

  it('doktor listesini getirmeli', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('ID ile doktor getirmeli', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});