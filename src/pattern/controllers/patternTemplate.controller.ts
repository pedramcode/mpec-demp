import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import PatternTemplateService from '../services/patternTemplate.service';
import {
  applyPatternToExampleDto,
  CreatePatternTemplateDto,
  UpdatePatternTemplateDto,
} from '../dto/patternTemplate.dto';

@Controller('pattern-templates')
export class PatternTemplateController {
  constructor(
    private readonly patternTemplateService: PatternTemplateService,
  ) {}

  @Post()
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
  update(@Param('id') id: string, @Body() dto: UpdatePatternTemplateDto) {
    return this.patternTemplateService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patternTemplateService.remove(id);
  }

  @Post('/apply-pattern-to-example')
  async applyPatternToExample(@Body() dto: applyPatternToExampleDto) {
    return this.patternTemplateService.applyPatternToExample(dto);
  }
}
