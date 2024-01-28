import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CalculateService } from './calculate.service';
import { CalculateDto } from 'src/calculate/dto/calculate.dto';

@ApiTags('Calculate')
@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post()
  @ApiBody({ type: CalculateDto })
  postCalculate(@Body() calculateDto: CalculateDto) {
    //const { monto, origin, destination } = calculateDto;
    return this.calculateService.postCalculate(calculateDto);
  }
}
