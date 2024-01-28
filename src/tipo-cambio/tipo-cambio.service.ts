import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTipoCambioDto } from './dto/create-tipo-cambio.dto';
import { UpdateTipoCambioDto } from './dto/update-tipo-cambio.dto';
import { Repository } from 'typeorm';
import { TipoCambio } from './entities/tipo-cambio.entity';

@Injectable()
export class TipoCambioService {
  private readonly logger = new Logger('TipoCambioService');

  constructor(
    @InjectRepository(TipoCambio)
    private readonly tipoCambioRepository: Repository<TipoCambio>,
  ) {}

  async create(createTipoCambioDto: CreateTipoCambioDto) {
    try {
      const tipoCambio = this.tipoCambioRepository.create(createTipoCambioDto);
      await this.tipoCambioRepository.save(tipoCambio);

      return tipoCambio;
    } catch (error) {
      this.handleDBExpections(error);
    }
  }

  findAll() {
    return this.tipoCambioRepository.find({});
  }

  async findOne(id: string) {
    const tipoCambio = await this.tipoCambioRepository.findOneBy({ id });
    if (!tipoCambio)
      throw new NotFoundException(`Tipo Cambio with id ${id} not found.`);

    return tipoCambio;
  }

  async update(id: string, updateTipoCambioDto: UpdateTipoCambioDto) {
    const tipoCambio = await this.tipoCambioRepository.preload({
      id,
      ...updateTipoCambioDto,
    });

    if (!tipoCambio)
      throw new NotFoundException(`Tipo cambio id: ${id} not found`);

    try {
      await this.tipoCambioRepository.save(tipoCambio);
      return tipoCambio;
    } catch (error) {
      this.handleDBExpections(error);
    }
  }

  async remove(id: string) {
    const tipoCambio = await this.findOne(id);
    await this.tipoCambioRepository.remove(tipoCambio);
  }

  private handleDBExpections(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check Server Logs',
    );
  }
}
