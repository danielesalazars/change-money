import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TipoCambioService } from './tipo-cambio.service';
import { TipoCambioController } from './tipo-cambio.controller';
import { TipoCambio } from './entities/tipo-cambio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TipoCambioController],
  providers: [TipoCambioService],
  imports: [TypeOrmModule.forFeature([TipoCambio]), AuthModule],
})
export class TipoCambioModule {}
