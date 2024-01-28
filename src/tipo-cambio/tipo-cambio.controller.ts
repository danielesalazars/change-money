import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TipoCambioService } from './tipo-cambio.service';
import { CreateTipoCambioDto } from './dto/create-tipo-cambio.dto';
import { UpdateTipoCambioDto } from './dto/update-tipo-cambio.dto';
import { TipoCambio } from './entities/tipo-cambio.entity';

@ApiTags('TipoCambio')
@Controller('tipo-cambio')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TipoCambioController {
  constructor(private readonly tipoCambioService: TipoCambioService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Tipo Cambio was created',
    type: TipoCambio,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden - Token related.' })
  create(@Body() createTipoCambioDto: CreateTipoCambioDto) {
    return this.tipoCambioService.create(createTipoCambioDto);
  }

  @Get()
  findAll() {
    return this.tipoCambioService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'TipoCambio id',
    type: 'string',
    format: 'uuid',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoCambioService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'Tipo Cambio was created',
    schema: {
      type: 'object',
      properties: {
        origin: {
          type: 'string',
          description: 'TipoCambio origin',
          example: 'USD',
        },
        destination: {
          type: 'string',
          description: 'TipoCambio destination',
          example: 'PEN',
        },
        change: {
          type: 'float',
          description: 'TipoCambio change',
          example: 30.45,
        },
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTipoCambioDto: UpdateTipoCambioDto,
  ) {
    return this.tipoCambioService.update(id, updateTipoCambioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoCambioService.remove(id);
  }
}
