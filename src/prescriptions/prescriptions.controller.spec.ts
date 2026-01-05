import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';

describe('PrescriptionsController', () => {
  let controller: PrescriptionsController;
  let service: PrescriptionsService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ prescId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionsController],
      providers: [{ provide: PrescriptionsService, useValue: mockService }],
    }).compile();

    controller = module.get<PrescriptionsController>(PrescriptionsController);
    service = module.get<PrescriptionsService>(PrescriptionsService);
  });

  it('reçeteleri listelemeli', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});