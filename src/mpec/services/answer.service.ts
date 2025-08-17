import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ANSWER_REPOSITORY } from '../tokens';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from '../dto/answer.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export default class AnswerService {
  constructor(
    @Inject(ANSWER_REPOSITORY)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    await validateOrReject(createAnswerDto);
    const answer = this.answerRepository.create(createAnswerDto);
    return await this.answerRepository.save(answer);
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerRepository.find();
  }

  async findOne(id: string): Promise<Answer> {
    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) throw new NotFoundException('Answer not found');
    return answer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    await validateOrReject(updateAnswerDto);
    const answer = await this.findOne(id);
    Object.assign(answer, updateAnswerDto);
    return await this.answerRepository.save(answer);
  }

  async remove(id: string): Promise<void> {
    const answer = await this.findOne(id);
    await this.answerRepository.remove(answer);
  }
}
