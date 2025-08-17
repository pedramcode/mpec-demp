import { BaseEntity } from 'src/database/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { PatternInstance } from './patternInstance.entity';

@Entity()
export class PatternTemplate extends BaseEntity {
  @Column({ type: 'varchar', length: 32 })
  name: string;

  @Column({ type: 'json' })
  entities: object;

  @Column({ type: 'json' })
  relations: object;

  @ManyToOne(() => Course, (course) => course.patternTemplates)
  @JoinColumn()
  course: Course;

  @OneToMany(() => PatternInstance, (instance) => instance.patternTemplate)
  patternInstances: PatternInstance[];
}
