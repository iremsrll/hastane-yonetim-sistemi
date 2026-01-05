import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty({ example: 'Parol 500mg, Augmentin 625mg' })
  @IsString()
  @IsNotEmpty({ message: 'Reçete içeriği (ilaç listesi) boş bırakılamaz.' })
  medications: string;

  @ApiProperty({ example: 'Günde 2 kez tok karnına' })
  @IsString()
  notes: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  appointmentId: number; // Reçete hangi randevuya ait?
}