import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsModule } from './doctors.module';
import { DepartmentsModule } from '../departments/departments.module';

import { Doctor } from './entities/doctor.entity';
import { Department } from '../departments/entities/department.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Prescription } from '../prescriptions/entities/prescription.entity';

describe('Doctors (Entegrasyon)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Doctor, Department, Patient, Appointment, Prescription],
          synchronize: true,
        }),
        DoctorsModule,
        DepartmentsModule, 
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 20000);

  it('/POST doctors -> Yeni hekim oluşturmalı', async () => {
    const deptRes = await request(app.getHttpServer())
      .post('/departments')
      .send({ deptName: 'Dahiliye', floorNumber: 1 });

    const realDeptId = deptRes.body.deptId; 


    return request(app.getHttpServer())
      .post('/doctors')
      .send({ 
        doctorFullName: 'Dr. Mehmet', 
        specialization: 'Dahiliye', 
        departmentId: realDeptId
      })
      .expect(201);
  });

  it('/GET doctors -> Tüm hekimleri listelemeli', () => {
    return request(app.getHttpServer()).get('/doctors').expect(200);
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});