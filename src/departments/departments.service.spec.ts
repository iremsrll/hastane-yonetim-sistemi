import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

describe('DepartmentsService (Birim Testi)', () => {
  let service: DepartmentsService;
  let repository;

  const mockDeptRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockDeptRepo,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    repository = module.get(getRepositoryToken(Department));
  });

  it('tüm bölümleri listelemeli', async () => {
    const departments = [{ deptId: 1, deptName: 'KBB' }];
    repository.find.mockReturnValue(Promise.resolve(departments));

    const result = await service.findAll();
    expect(result).toEqual(departments);
    expect(repository.find).toHaveBeenCalled();
  });
});