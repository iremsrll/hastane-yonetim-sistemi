import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Mehmet Öz' })
  @IsString()
  @IsNotEmpty({ message: 'Hasta adı ve soyadı alanı zorunludur.' })
  patientName: string;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  @Length(11, 11, { message: 'Kimlik numarası tam olarak 11 haneli olmalıdır.' })
  identityNumber: string;
}