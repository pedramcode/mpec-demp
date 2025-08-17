import { answerProviders } from './answer.provider';
import { courseProviders } from './course.provider';
import { exampleProviders } from './example.provider';
import { patternInstanceProviders } from './patternInstance.provider';
import { patternTemplateProviders } from './patternTemplate.provider';

export const entityProviders = [
  ...answerProviders,
  ...courseProviders,
  ...exampleProviders,
  ...patternInstanceProviders,
  ...patternTemplateProviders,
];
