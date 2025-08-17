import { Module } from '@nestjs/common';
import { MpecService } from './mpec.service';
import { DatabaseModule } from 'src/database/database.module';
import { entityProviders } from './providers';
import AnswerService from './services/answer.service';
import CourseService from './services/course.service';
import ExampleService from './services/example.service';
import PatternInstanceService from './services/patternInstance.service';
import PatternTemplateService from './services/patternTemplate.service';
import { ExampleController } from './controllers/example.controller';
import { AnswerController } from './controllers/answer.controller';
import { CourseController } from './controllers/course.controller';
import { PatternInstanceController } from './controllers/patternInstance.controller';
import { PatternTemplateController } from './controllers/patternTemplate.controller';

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
