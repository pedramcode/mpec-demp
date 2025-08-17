import { ExplanatoryStep } from './explanatoryStep';
import { KnowledgeGraph } from './knowledgeGraph';

export interface ExplanatoryChain extends KnowledgeGraph {
  steps: ExplanatoryStep[];
}
