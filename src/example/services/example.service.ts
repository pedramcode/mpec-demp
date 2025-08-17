import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Example, ExampleType } from '../entities/example.entity';
import {
  CreateExampleDto,
  SolveTestQuestionDto,
  SolveTestQuestionResponseDto,
  UpdateExampleDto,
} from '../dto/example.dto';
import { EXAMPLE_REPOSITORY } from 'src/tokens';
import PatternTemplateService from 'src/pattern/services/patternTemplate.service';
import { AiService } from 'src/ai/ai.service';
import PatternInstanceService from 'src/pattern/services/patternInstance.service';
import AnswerService from './answer.service';

@Injectable()
export default class ExampleService {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly exampleRepository: Repository<Example>,
    @Inject(forwardRef(() => PatternTemplateService))
    private readonly patternTemplateService: PatternTemplateService,
    @Inject(forwardRef(() => PatternInstanceService))
    private readonly patternInstanceService: PatternInstanceService,
    private readonly aiService: AiService,
    private readonly answerService: AnswerService,
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(createExampleDto);
    return await this.exampleRepository.save(example);
  }

  async findAll(): Promise<Example[]> {
    return await this.exampleRepository.find();
  }

  async findOne(id: string): Promise<Example> {
    const example = await this.exampleRepository.findOne({ where: { id } });
    if (!example) throw new NotFoundException('Example not found');
    return example;
  }

  async update(
    id: string,
    updateExampleDto: UpdateExampleDto,
  ): Promise<Example> {
    const example = await this.findOne(id);
    Object.assign(example, updateExampleDto);
    return await this.exampleRepository.save(example);
  }

  async remove(id: string): Promise<void> {
    const example = await this.findOne(id);
    await this.exampleRepository.remove(example);
  }

  async solveTestQuestion(
    dto: SolveTestQuestionDto,
  ): Promise<SolveTestQuestionResponseDto> {
    const pattern = await this.patternTemplateService.findOne(
      dto.patternTemplateId,
    );
    const example = await this.findOne(dto.exampleId);
    const test = await this.create({
      content: dto.testContent,
      type: ExampleType.TEST,
    });
    const result = await this.aiService.solveTestQuestion(
      pattern.entities,
      pattern.relations,
      example.content,
      test.content,
    );
    const instance = await this.patternInstanceService.create({
      entities: result.result.entities,
      exampleId: example.id,
      name: '',
      patternTemplateId: pattern.id,
      relations: result.result.relations,
      steps: result.result.steps,
    });
    // calculate example or get it from API to see it's correct
    const isCorrect = true;
    const answer = await this.answerService.create({
      answerText: result.answer,
      exampleId: example.id,
      isCorrect: isCorrect,
      patternInstanceId: instance.id,
    });
    return {
      answerText: result.answer,
      answerId: answer.id,
      patternInstanceId: instance.id,
      result: result.result,
      testExampleId: example.id,
    };
  }
}
