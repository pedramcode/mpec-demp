import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { exampleProviders } from './providers/example.provider';
import { answerProviders } from './providers/answer.provider';
import ExampleService from './services/example.service';
import AnswerService from './services/answer.service';
import { ExampleController } from './controllers/example.controller';
import { AnswerController } from './controllers/answer.controller';

@Module({
  providers: [
    ...exampleProviders,
    ...answerProviders,
    ExampleService,
    AnswerService,
  ],
  imports: [DatabaseModule],
  controllers: [ExampleController, AnswerController],
})
export class ExampleModule {}
