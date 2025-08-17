import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreatePatternTemplateDto {
  @IsString()
  name: string;

  @IsObject()
  entities: object;

  @IsObject()
  relations: object;

  @IsString()
  courseId: string;
}

export class UpdatePatternTemplateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  entities?: object;

  @IsOptional()
  @IsObject()
  relations?: object;

  @IsOptional()
  @IsString()
  courseId?: string;
}
