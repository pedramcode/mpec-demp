import { BaseEntity } from 'src/database/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PatternTemplate } from './patternTemplate.entity';
import { Example } from './example.entity';
import { Answer } from './answer.entity';

@Entity()
export class PatternInstance extends BaseEntity {
  @Column({ type: 'varchar', length: 32 })
  name: string;

  @Column({ type: 'json' })
  entities: object;

  @Column({ type: 'json' })
  relations: object;

  @Column({ type: 'json' })
  steps: object;

  @ManyToOne(
    () => PatternTemplate,
    (patternTemplate) => patternTemplate.patternInstances,
  )
  @JoinColumn()
  patternTemplate: PatternTemplate;

  @ManyToOne(() => Example, (example) => example.patternInstances)
  @JoinColumn()
  example: Example;

  @OneToMany(() => Answer, (answer) => answer.example)
  answers: Answer[];
}
