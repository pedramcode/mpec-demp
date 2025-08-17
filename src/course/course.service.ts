import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { COURSE_REPOSITORY } from 'src/tokens';
import { Course } from './entities/course.entity';
import {
  CreateCourseDto,
  ExtractCourseResponseDto,
  UpdateCourseDto,
} from './dto/course.dto';
import { AiService } from 'src/ai/ai.service';
import PatternTemplateService from 'src/pattern/services/patternTemplate.service';

@Injectable()
export default class CourseService {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: Repository<Course>,
    private readonly aiService: AiService,
    private readonly patternTemplateService: PatternTemplateService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    Object.assign(course, updateCourseDto);
    return await this.courseRepository.save(course);
  }

  async remove(id: string): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }

  async extractCoursePattern(
    createCourseDto: CreateCourseDto,
  ): Promise<ExtractCourseResponseDto> {
    const course = await this.create(createCourseDto);
    const patternResult = await this.aiService.extractPattern(course.content);
    const pattern = await this.patternTemplateService.create({
      courseId: course.id,
      name: course.title,
      entities: patternResult.entities,
      relations: patternResult.relations,
    });
    return {
      courseId: course.id,
      patternId: pattern.id,
      result: patternResult,
    };
  }
}
