/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { KnowledgeGraph } from './types/knowledgeGraph';
import mockJsonData from './mock/data';
import { ExplanatoryChain } from './types/explanatoryChain';

@Injectable()
export class AiService {
  async extractPattern(content: string): Promise<KnowledgeGraph> {
    // Chose addition for demo purposes
    const response = mockJsonData['coursePatternExtraction']['addition'];
    if (!response || !response['success']) {
      throw new InternalServerErrorException(
        'server could not retrieve data correctly',
      );
    }
    const result: KnowledgeGraph = response['coursePattern'] as KnowledgeGraph;
    return result;
  }

  async applyPatternExample(
    entities: object,
    relations: object,
    example: string,
  ): Promise<ExplanatoryChain> {
    // Chose addition for demo purposes
    const response = mockJsonData['exampleAnalysis']['addition_3_plus_2'];
    if (!response || !response['success']) {
      throw new InternalServerErrorException(
        'server could not retrieve data correctly',
      );
    }
    const result: ExplanatoryChain = response[
      'explanatoryChain'
    ] as ExplanatoryChain;
    return result;
  }

  async solveTestQuestion(
    entities: object,
    relations: object,
    example: string,
    test: string,
  ): Promise<{ answer: string; result: ExplanatoryChain }> {
    // Chose addition for demo purposes
    const response = mockJsonData['testQuestionSolutions']['addition_5_plus_4'];
    if (!response || !response['success']) {
      throw new InternalServerErrorException(
        'server could not retrieve data correctly',
      );
    }
    const solution = response['solution'];
    const answer = solution['answer'];
    const result: ExplanatoryChain = solution[
      'explanatoryChain'
    ] as ExplanatoryChain;
    return {
      answer,
      result,
    };
  }
}
