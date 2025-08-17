import { Module } from '@nestjs/common';
import { MpecService } from './mpec.service';
import { DatabaseModule } from 'src/database/database.module';
import { entityProviders } from './providers';
import AnswerService from './answer.service';
import CourseService from './course.service';
import ExampleService from './example.service';
import PatternInstanceService from './patternInstance.service';
import PatternTemplateService from './patternTemplate.service';
import { ExampleController } from './example.controller';
import { AnswerController } from './answer.controller';
import { CourseController } from './course.controller';
import { PatternInstanceController } from './patternInstance.controller';
import { PatternTemplateController } from './patternTemplate.controller';

@Module({
  providers: [
    ...entityProviders,
    MpecService,
    AnswerService,
    CourseService,
    ExampleService,
    PatternInstanceService,
    PatternTemplateService,
  ],
  imports: [DatabaseModule],
  controllers: [
    ExampleController,
    AnswerController,
    CourseController,
    PatternInstanceController,
    PatternTemplateController,
  ],
})
export class MpecModule {}
