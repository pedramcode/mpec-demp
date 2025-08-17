import { DataSource } from 'typeorm';
import { Course } from '../entities/course.entity';
import { COURSE_REPOSITORY } from 'src/tokens';

export const courseProviders = [
  {
    provide: COURSE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
];
