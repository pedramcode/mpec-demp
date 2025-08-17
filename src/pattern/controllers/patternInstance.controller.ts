import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import PatternInstanceService from '../services/patternInstance.service';
import {
  CreatePatternInstanceDto,
  UpdatePatternInstanceDto,
} from '../dto/patternInstance.dto';

@Controller('pattern-instances')
export class PatternInstanceController {
  constructor(
    private readonly patternInstanceService: PatternInstanceService,
  ) {}

  @Post()
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
  update(@Param('id') id: string, @Body() dto: UpdatePatternInstanceDto) {
    return this.patternInstanceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patternInstanceService.remove(id);
  }
}
