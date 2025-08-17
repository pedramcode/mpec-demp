import { BaseEntity } from 'src/database/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Example } from './example.entity';
import { PatternInstance } from 'src/pattern/entities/patternInstance.entity';

@Entity()
export class Answer extends BaseEntity {
  @ManyToOne(() => Example, (example) => example.answers)
  @JoinColumn()
  example: Example;

  @ManyToOne(
    () => PatternInstance,
    (patternInstance) => patternInstance.answers,
  )
  @JoinColumn()
  patternInstance: PatternInstance;

  @Column({ type: 'varchar', length: 256 })
  answerText: string;

  @Column()
  isCorrect: boolean;
}
