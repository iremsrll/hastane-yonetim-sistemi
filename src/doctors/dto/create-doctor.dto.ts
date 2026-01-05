import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Doç. Dr. Canan Dağdeviren' })
  @IsString()
  @IsNotEmpty({ message: 'Doktor bilgisi boş geçilemez.' })
  doctorFullName: string;

  @ApiProperty({ example: 'Kardiyoloji' })
  @IsString()
  specialization: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  departmentId: number;
}