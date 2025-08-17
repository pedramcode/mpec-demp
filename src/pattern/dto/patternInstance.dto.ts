import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatternInstanceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: Object })
  @IsObject()
  entities: object;

  @ApiProperty({ type: Object })
  @IsObject()
  relations: object;

  @ApiProperty({ type: Object })
  @IsObject()
  steps: object;

  @ApiProperty()
  @IsString()
  patternTemplateId: string;

  @ApiProperty()
  @IsString()
  exampleId: string;
}

export class UpdatePatternInstanceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  entities?: object;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  relations?: object;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  steps?: object;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patternTemplateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  exampleId?: string;
}
