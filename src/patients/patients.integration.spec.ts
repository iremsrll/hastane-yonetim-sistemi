import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients.module';
import { Patient } from './entities/patient.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Department } from '../departments/entities/department.entity';
import { Prescription } from '../prescriptions/entities/prescription.entity';

describe('Patients (Entegrasyon Testi)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Patient, Appointment, Doctor, Department, Prescription],
          synchronize: true,
        }),
        PatientsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 10000); 

  it('/POST patients -> Yeni hasta kaydı oluşturmalı', () => {
    return request(app.getHttpServer())
      .post('/patients')
      .send({
        patientName: 'Mehmet Entegrasyon',
        identityNumber: '12312312344',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.patientName).toBe('Mehmet Entegrasyon');
        expect(response.body).toHaveProperty('patientId');
      });
  });

  it('/GET patients -> Tüm hastaları listelemeli', () => {
    return request(app.getHttpServer())
      .get('/patients')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/GET patients/:id -> Belirli bir hastayı getirmeli', async () => {
    const created = await request(app.getHttpServer())
      .post('/patients')
      .send({ patientName: 'ID Testi', identityNumber: '00011122233' });

    const id = created.body.patientId;

    return request(app.getHttpServer())
      .get(`/patients/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.patientName).toBe('ID Testi');
      });
  });

  it('/DELETE patients/:id -> Hastayı sistemden silmeli', async () => {
    const created = await request(app.getHttpServer())
      .post('/patients')
      .send({ patientName: 'Silinecek Hasta', identityNumber: '99911188822' });

    const id = created.body.patientId;

    await request(app.getHttpServer()).delete(`/patients/${id}`).expect(200);
    return request(app.getHttpServer()).get(`/patients/${id}`).expect(404);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
