import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, IsString, Length } from 'class-validator';

export class CalculateDto {
  @ApiProperty({
    type: Number,
    description: 'Ammount to calculate ',
    example: 120,
  })
  @IsPositive()
  @Type(() => Number)
  readonly monto: number;

  @ApiProperty({
    type: String,
    description: 'origin coin',
    example: 'USD',
  })
  @IsString()
  @Length(3, 3)
  readonly origin: string;

  @ApiProperty({
    type: String,
    description: 'destination coin',
    example: 'PEN',
  })
  @IsString()
  @Length(3, 3)
  readonly destination: string;
}
