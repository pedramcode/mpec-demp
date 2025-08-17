import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatternTemplateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: Object })
  @IsObject()
  entities: object;

  @ApiProperty({ type: Object })
  @IsObject()
  relations: object;

  @ApiProperty()
  @IsString()
  courseId: string;
}

export class UpdatePatternTemplateDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  courseId?: string;
}
