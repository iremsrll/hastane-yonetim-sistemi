import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { Department } from './entities/department.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Prescription } from '../prescriptions/entities/prescription.entity';

describe('Departments (Entegrasyon)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Department, Doctor, Patient, Appointment, Prescription],
          synchronize: true,
        }),
        DepartmentsModule,
        DoctorsModule, 
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  }, 15000); 

  it('/POST departments -> Bölüm oluşturmalı', () => {
    return request(app.getHttpServer())
      .post('/departments')
      .send({ deptName: 'Kardiyoloji', floorNumber: 2 })
      .expect(201);
  });

  it('/GET departments -> Bölümleri getirmeli', () => {
    return request(app.getHttpServer()).get('/departments').expect(200);
  });

  it('/PATCH departments/:id -> Bölüm bilgisini güncellemeli', async () => {
    const created = await request(app.getHttpServer())
      .post('/departments').send({ deptName: 'Eski Ad', floorNumber: 1 });
    
    return request(app.getHttpServer())
      .patch(`/departments/${created.body.deptId}`)
      .send({ deptName: 'Yeni Ad' })
      .expect(200);
  });

  afterAll(async () => { await app.close(); });
});