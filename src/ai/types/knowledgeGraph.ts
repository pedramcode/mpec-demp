import { Entity } from './entity';
import { Relation } from './relation';

export interface KnowledgeGraph {
  entities: Entity[];
  relations: Relation[];
}
