import { DataSource } from 'typeorm';
import { PatternInstance } from '../entities/patternInstance.entity';
import { PATTERNINSTANCE_REPOSITORY } from '../tokens';

export const patternInstanceProviders = [
  {
    provide: PATTERNINSTANCE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatternInstance),
    inject: ['DATA_SOURCE'],
  },
];
