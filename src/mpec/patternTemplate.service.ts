import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PATTERNTEMPLATE_REPOSITORY } from './tokens';
import { Repository } from 'typeorm';
import { PatternTemplate } from './entities/patternTemplate.entity';
import {
  CreatePatternTemplateDto,
  UpdatePatternTemplateDto,
} from './dto/patternTemplate.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export default class PatternTemplateService {
  constructor(
    @Inject(PATTERNTEMPLATE_REPOSITORY)
    private readonly patternTemplateRepository: Repository<PatternTemplate>,
  ) {}

  async create(
    createPatternTemplateDto: CreatePatternTemplateDto,
  ): Promise<PatternTemplate> {
    await validateOrReject(createPatternTemplateDto);
    const template = this.patternTemplateRepository.create(
      createPatternTemplateDto,
    );
    return await this.patternTemplateRepository.save(template);
  }

  async findAll(): Promise<PatternTemplate[]> {
    return await this.patternTemplateRepository.find();
  }

  async findOne(id: string): Promise<PatternTemplate> {
    const template = await this.patternTemplateRepository.findOne({
      where: { id },
    });
    if (!template) throw new NotFoundException('PatternTemplate not found');
    return template;
  }

  async update(
    id: string,
    updatePatternTemplateDto: UpdatePatternTemplateDto,
  ): Promise<PatternTemplate> {
    await validateOrReject(updatePatternTemplateDto);
    const template = await this.findOne(id);
    Object.assign(template, updatePatternTemplateDto);
    return await this.patternTemplateRepository.save(template);
  }

  async remove(id: string): Promise<void> {
    const template = await this.findOne(id);
    await this.patternTemplateRepository.remove(template);
  }
}
