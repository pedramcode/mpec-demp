import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { courseProviders } from './providers/course.provider';
import { CourseController } from './course.controller';
import CourseService from './course.service';
import { AiModule } from 'src/ai/ai.module';
import { PatternModule } from 'src/pattern/pattern.module';

@Module({
  providers: [CourseService, ...courseProviders],
  imports: [DatabaseModule, AiModule, PatternModule],
  controllers: [CourseController],
})
export class CourseModule {}
