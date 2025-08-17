import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EXAMPLE_REPOSITORY } from './tokens';
import { Repository } from 'typeorm';
import { Example } from './entities/example.entity';
import { CreateExampleDto, UpdateExampleDto } from './dto/example.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export default class ExampleService {
  constructor(
    @Inject(EXAMPLE_REPOSITORY)
    private readonly exampleRepository: Repository<Example>,
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    await validateOrReject(createExampleDto);
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
    await validateOrReject(updateExampleDto);
    const example = await this.findOne(id);
    Object.assign(example, updateExampleDto);
    return await this.exampleRepository.save(example);
  }

  async remove(id: string): Promise<void> {
    const example = await this.findOne(id);
    await this.exampleRepository.remove(example);
  }
}
