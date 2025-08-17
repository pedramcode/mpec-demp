import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import PatternInstanceService from './patternInstance.service';
import {
  CreatePatternInstanceDto,
  UpdatePatternInstanceDto,
} from './dto/patternInstance.dto';

@Controller('pattern-instances')
export class PatternInstanceController {
  constructor(
    private readonly patternInstanceService: PatternInstanceService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreatePatternInstanceDto) {
    return this.patternInstanceService.create(dto);
  }

  @Get()
  findAll() {
    return this.patternInstanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patternInstanceService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() dto: UpdatePatternInstanceDto) {
    return this.patternInstanceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patternInstanceService.remove(id);
  }
}
