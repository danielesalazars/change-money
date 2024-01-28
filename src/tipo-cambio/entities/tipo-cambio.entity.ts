import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('tipo_cambio')
@Unique(['origin', 'destination'])
export class TipoCambio {
  @ApiProperty({
    example: '7c901a05-619b-419e-885b-e2580fb8b061',
    description: 'uuid',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'USD',
    description: 'origin',
  })
  @Column({ type: 'varchar', nullable: false })
  origin: string;

  @ApiProperty({
    example: 'CAD',
    description: 'destination',
  })
  @Column({ type: 'varchar', nullable: false })
  destination: string;

  @ApiProperty({
    example: 2.55,
    description: 'change',
    default: 0,
  })
  @Column({ type: 'float', nullable: false, default: 0 })
  change: number;
}
