import { IsString, IsOptional, IsEnum } from 'class-validator';
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
