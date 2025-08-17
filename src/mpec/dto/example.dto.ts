import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ExampleType } from '../entities/example.entity';

export class CreateExampleDto {
  @IsString()
  content: string;

  @IsEnum(ExampleType)
  type: ExampleType;
}

export class UpdateExampleDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(ExampleType)
  type?: ExampleType;
}
