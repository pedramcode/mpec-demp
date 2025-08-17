import { DataSource } from 'typeorm';
import { PatternTemplate } from '../entities/patternTemplate.entity';
import { PATTERNTEMPLATE_REPOSITORY } from '../tokens';

export const patternTemplateProviders = [
  {
    provide: PATTERNTEMPLATE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatternTemplate),
    inject: ['DATA_SOURCE'],
  },
];
