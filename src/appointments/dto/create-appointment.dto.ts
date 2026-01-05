import { IsInt, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2026-01-20T10:30:00Z' })
  @IsISO8601({}, { message: 'Lütfen geçerli bir tarih formatı giriniz (ISO8601).' })
  appointmentDate: Date;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  doctorId: number;
}