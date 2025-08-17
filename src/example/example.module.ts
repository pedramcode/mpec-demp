import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { exampleProviders } from './providers/example.provider';
import { answerProviders } from './providers/answer.provider';
import ExampleService from './services/example.service';
import AnswerService from './services/answer.service';
import { ExampleController } from './controllers/example.controller';
import { AnswerController } from './controllers/answer.controller';
import { PatternModule } from 'src/pattern/pattern.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  providers: [
    ...exampleProviders,
    ...answerProviders,
    ExampleService,
    AnswerService,
  ],
  imports: [DatabaseModule, forwardRef(() => PatternModule), AiModule],
  exports: [ExampleService],
  controllers: [ExampleController, AnswerController],
})
export class ExampleModule {}
