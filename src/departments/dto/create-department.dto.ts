import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Kardiyoloji' })
  @IsString()
  @IsNotEmpty({ message: 'Bölüm adı boş bırakılamaz.' })
  deptName: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0, { message: 'Kat numarası negatif bir değer olamaz.' })
  floorNumber: number;
}