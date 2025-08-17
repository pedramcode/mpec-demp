import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PATTERNINSTANCE_REPOSITORY } from '../tokens';
import { Repository } from 'typeorm';
import { PatternInstance } from '../entities/patternInstance.entity';
import {
  CreatePatternInstanceDto,
  UpdatePatternInstanceDto,
} from '../dto/patternInstance.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export default class PatternInstanceService {
  constructor(
    @Inject(PATTERNINSTANCE_REPOSITORY)
    private readonly patternInstanceRepository: Repository<PatternInstance>,
  ) {}

  async create(
    createPatternInstanceDto: CreatePatternInstanceDto,
  ): Promise<PatternInstance> {
    await validateOrReject(createPatternInstanceDto);
    const instance = this.patternInstanceRepository.create(
      createPatternInstanceDto,
    );
    return await this.patternInstanceRepository.save(instance);
  }

  async findAll(): Promise<PatternInstance[]> {
    return await this.patternInstanceRepository.find();
  }

  async findOne(id: string): Promise<PatternInstance> {
    const instance = await this.patternInstanceRepository.findOne({
      where: { id },
    });
    if (!instance) throw new NotFoundException('PatternInstance not found');
    return instance;
  }

  async update(
    id: string,
    updatePatternInstanceDto: UpdatePatternInstanceDto,
  ): Promise<PatternInstance> {
    await validateOrReject(updatePatternInstanceDto);
    const instance = await this.findOne(id);
    Object.assign(instance, updatePatternInstanceDto);
    return await this.patternInstanceRepository.save(instance);
  }

  async remove(id: string): Promise<void> {
    const instance = await this.findOne(id);
    await this.patternInstanceRepository.remove(instance);
  }
}
