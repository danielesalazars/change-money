import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateTipoCambioDto {
  @IsString()
  @Length(3, 3)
  origin: string;

  @IsString()
  @Length(3, 3)
  destination: string;

  @IsNumber()
  @IsPositive()
  change: number;
}
