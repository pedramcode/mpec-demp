import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PatternTemplate } from '../entities/patternTemplate.entity';
import {
  applyPatternToExampleDto,
  applyPatternToExampleResponseDto,
  CreatePatternTemplateDto,
  UpdatePatternTemplateDto,
} from '../dto/patternTemplate.dto';
import { PATTERNTEMPLATE_REPOSITORY } from 'src/tokens';
import { AiService } from 'src/ai/ai.service';
import ExampleService from 'src/example/services/example.service';
import { ExampleType } from 'src/example/entities/example.entity';
import PatternInstanceService from './patternInstance.service';

@Injectable()
export default class PatternTemplateService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    @Inject(PATTERNTEMPLATE_REPOSITORY)
    private readonly patternTemplateRepository: Repository<PatternTemplate>,
    private readonly aiService: AiService,
    private readonly exampleService: ExampleService,
    private readonly patternInstanceService: PatternInstanceService,
  ) {}

  async create(
    createPatternTemplateDto: CreatePatternTemplateDto,
  ): Promise<PatternTemplate> {
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
    const template = await this.findOne(id);
    Object.assign(template, updatePatternTemplateDto);
    return await this.patternTemplateRepository.save(template);
  }

  async remove(id: string): Promise<void> {
    const template = await this.findOne(id);
    await this.patternTemplateRepository.remove(template);
  }

  async applyPatternToExample(
    dto: applyPatternToExampleDto,
  ): Promise<applyPatternToExampleResponseDto> {
    const pattern = await this.findOne(dto.patternTemplateId);
    const applyResult = await this.aiService.applyPatternExample(
      pattern.entities,
      pattern.relations,
      dto.exampleContent,
    );
    const example = await this.exampleService.create({
      content: dto.exampleContent,
      type: ExampleType.EXAMPLE,
    });
    const instance = await this.patternInstanceService.create({
      entities: applyResult.entities,
      relations: applyResult.relations,
      steps: applyResult.steps,
      exampleId: example.id,
      name: '',
      patternTemplateId: pattern.id,
    });
    return {
      exampleId: example.id,
      patternInstanceId: instance.id,
      result: applyResult,
    };
  }
}
