import { BaseEntity } from 'src/database/baseEntity';
import { PatternTemplate } from 'src/pattern/entities/patternTemplate.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @Column({ type: 'varchar', length: 32 })
  title: string;

  @Column({ type: 'varchar', length: 256 })
  content: string;

  @OneToMany(() => PatternTemplate, (temp) => temp.course)
  patternTemplates: PatternTemplate[];
}
