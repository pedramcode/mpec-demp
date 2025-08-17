import { DataSource } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { ANSWER_REPOSITORY } from 'src/tokens';

export const answerProviders = [
  {
    provide: ANSWER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Answer),
    inject: ['DATA_SOURCE'],
  },
];
