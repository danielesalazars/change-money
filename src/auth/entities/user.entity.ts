import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: '7c901a05-619b-419e-885b-e2580fb8b061',
    description: 'uuid',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'correo@example.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description: 'User password',
  })
  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @ApiProperty({
    example: 'Juan Perez',
    description: 'User fullName',
  })
  @Column({ type: 'text', nullable: false })
  fullName: string;

  @Column({ type: 'bool', nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'text', array: true, nullable: false, default: ['user'] })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
