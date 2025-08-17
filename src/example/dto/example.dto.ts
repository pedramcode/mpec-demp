import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExampleType } from '../entities/example.entity';

export class CreateExampleDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ enum: ExampleType })
  @IsEnum(ExampleType)
  type: ExampleType;
}

export class UpdateExampleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ enum: ExampleType })
  @IsOptional()
  @IsEnum(ExampleType)
  type?: ExampleType;
}

export class SolveTestQuestionDto {
  @ApiProperty()
  @IsString()
  patternTemplateId: string;

  @ApiProperty()
  @IsString()
  exampleId: string;

  @ApiProperty()
  @IsString()
  testContent: string;
}

export class SolveTestQuestionResponseDto {
  @ApiProperty()
  @IsString()
  patternInstanceId: string;

  @ApiProperty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsString()
  testExampleId: string;

  @ApiProperty()
  @IsObject()
  result: object;
}
