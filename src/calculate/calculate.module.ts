import { Module } from '@nestjs/common';
import { CalculateController } from './calculate.controller';
import { CalculateService } from './calculate.service';
import { TipoCambio } from 'src/tipo-cambio/entities/tipo-cambio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CalculateController],
  providers: [CalculateService],
  imports: [TypeOrmModule.forFeature([TipoCambio])],
})
export class CalculateModule {}
