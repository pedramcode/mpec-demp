import { DataSource } from 'typeorm';
import { Example } from '../entities/example.entity';
import { EXAMPLE_REPOSITORY } from '../tokens';

export const exampleProviders = [
  {
    provide: EXAMPLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Example),
    inject: ['DATA_SOURCE'],
  },
];
