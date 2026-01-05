import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
  ) {}

  async create(dto: CreateDepartmentDto) {
    const dept = this.deptRepo.create(dto); 
    return await this.deptRepo.save(dept);
  }

  async findAll() {
    return await this.deptRepo.find({ relations: ['doctors'] });
  }

  async findOne(id: number) {
    const dept = await this.deptRepo.findOne({ where: { deptId: id }, relations: ['doctors'] });
    if (!dept) throw new NotFoundException(`Bölüm kaydı (#${id}) bulunamadı.`);
    return dept;
  }

  async update(id: number, dto: any) {
    const dept = await this.findOne(id);
    return await this.deptRepo.save({ ...dept, ...dto });
  }

  async remove(id: number) {
    const dept = await this.findOne(id);
    return await this.deptRepo.remove(dept);
  }
}