import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './../src/patients/entities/patient.entity';
import { Doctor } from './../src/doctors/entities/doctor.entity';
import { Department } from './../src/departments/entities/department.entity';
import { Appointment } from './../src/appointments/entities/appointment.entity';
import { Prescription } from './../src/prescriptions/entities/prescription.entity';

import { PatientsModule } from './../src/patients/patients.module';
import { DoctorsModule } from './../src/doctors/doctors.module';
import { DepartmentsModule } from './../src/departments/departments.module';
import { AppointmentsModule } from './../src/appointments/appointments.module';
import { PrescriptionsModule } from './../src/prescriptions/prescriptions.module';

describe('Hastane Yönetim Sistemi (Sistem Testi)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Patient, Doctor, Department, Appointment, Prescription],
          synchronize: true,
        }),
        PatientsModule,
        DoctorsModule,
        DepartmentsModule,
        AppointmentsModule,
        PrescriptionsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 20000);

  it('Senaryo 1: Tam bir randevu akışı başarılı olmalı', async () => {
    const dept = await request(app.getHttpServer())
      .post('/departments')
      .send({ deptName: 'Göz', floorNumber: 1 })
      .expect(201);

    const doctor = await request(app.getHttpServer())
      .post('/doctors')
      .send({ doctorFullName: 'Dr. Bakır', specialization: 'Cerrah', departmentId: dept.body.deptId })
      .expect(201);

    const patient = await request(app.getHttpServer())
      .post('/patients')
      .send({ patientName: 'Sistem Testi Hastası', identityNumber: '12345678910' })
      .expect(201);

    const appointment = await request(app.getHttpServer())
      .post('/appointments')
      .send({
        appointmentDate: '2026-05-05T10:00:00Z',
        patientId: patient.body.patientId,
        doctorId: doctor.body.doctorId
      })
      .expect(201);

    expect(appointment.body).toHaveProperty('appoId');
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});