import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { courseProviders } from './providers/course.provider';
import { CourseController } from './course.controller';
import CourseService from './course.service';

@Module({
  providers: [CourseService, ...courseProviders],
  imports: [DatabaseModule],
  controllers: [CourseController],
})
export class CourseModule {}
