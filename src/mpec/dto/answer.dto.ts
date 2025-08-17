import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  exampleId: string;

  @IsString()
  patternInstanceId: string;

  @IsString()
  answerText: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  exampleId?: string;

  @IsOptional()
  @IsString()
  patternInstanceId?: string;

  @IsOptional()
  @IsString()
  answerText?: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
