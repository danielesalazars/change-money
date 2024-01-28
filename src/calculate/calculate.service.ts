import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoCambio } from '../tipo-cambio/entities/tipo-cambio.entity';
import { CalculateDto } from './dto/calculate.dto';

@Injectable()
export class CalculateService {
  constructor(
    @InjectRepository(TipoCambio)
    private readonly tipoCambioRepository: Repository<TipoCambio>,
  ) {}

  async postCalculate({ monto, origin, destination }: CalculateDto) {
    const queryBuilder = this.tipoCambioRepository.createQueryBuilder();

    const tipoCambio = await queryBuilder
      .where('origin=:origin and destination =:destination', {
        origin: origin,
        destination: destination,
      })
      .getOne();

    if (!tipoCambio) {
      throw new NotFoundException('The exchange rate does not exist.');
    }

    const montoChange = monto * tipoCambio.change;

    return {
      monto,
      montoChange,
      origin,
      destination,
      change: tipoCambio.change,
    };
  }
}
