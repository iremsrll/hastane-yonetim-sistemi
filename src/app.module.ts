import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DepartmentsModule } from './departments/departments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';

@Module({
  imports: [PatientsModule, DoctorsModule, DepartmentsModule, AppointmentsModule, PrescriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
