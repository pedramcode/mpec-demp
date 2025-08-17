import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreatePatternInstanceDto {
  @IsString()
  name: string;

  @IsObject()
  entities: object;

  @IsObject()
  relations: object;

  @IsObject()
  steps: object;

  @IsString()
  patternTemplateId: string;

  @IsString()
  exampleId: string;
}

export class UpdatePatternInstanceDto {
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
  @IsObject()
  steps?: object;

  @IsOptional()
  @IsString()
  patternTemplateId?: string;

  @IsOptional()
  @IsString()
  exampleId?: string;
}
