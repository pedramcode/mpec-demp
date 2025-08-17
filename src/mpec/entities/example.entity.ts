import { BaseEntity } from 'src/database/baseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PatternInstance } from './patternInstance.entity';
import { Answer } from './answer.entity';

export enum ExampleType {
  EXAMPLE = 'example',
  TEST = 'test',
}

@Entity()
export class Example extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  content: string;

  @Column({
    type: 'enum',
    enum: ExampleType,
    default: ExampleType.EXAMPLE,
  })
  type: ExampleType;

  @OneToMany(() => PatternInstance, (instance) => instance.patternTemplate)
  patternInstances: PatternInstance[];

  @OneToMany(() => Answer, (answer) => answer.example)
  answers: Answer[];
}
