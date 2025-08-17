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
import PatternTemplateService from './patternTemplate.service';
import {
  CreatePatternTemplateDto,
  UpdatePatternTemplateDto,
} from './dto/patternTemplate.dto';

@Controller('pattern-templates')
export class PatternTemplateController {
  constructor(
    private readonly patternTemplateService: PatternTemplateService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreatePatternTemplateDto) {
    return this.patternTemplateService.create(dto);
  }

  @Get()
  findAll() {
    return this.patternTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patternTemplateService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() dto: UpdatePatternTemplateDto) {
    return this.patternTemplateService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patternTemplateService.remove(id);
  }
}
