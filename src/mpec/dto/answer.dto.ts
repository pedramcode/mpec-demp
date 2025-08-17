import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  exampleId: string;

  @ApiProperty()
  @IsString()
  patternInstanceId: string;

  @ApiProperty()
  @IsString()
  answerText: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateAnswerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  exampleId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patternInstanceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  answerText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
