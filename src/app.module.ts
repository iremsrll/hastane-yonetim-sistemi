import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DepartmentsModule } from './departments/departments.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [PatientsModule, DoctorsModule, DepartmentsModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
