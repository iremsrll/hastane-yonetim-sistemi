import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ deptId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [{ provide: DepartmentsService, useValue: mockService }],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('tüm bölümleri listelemeli', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});