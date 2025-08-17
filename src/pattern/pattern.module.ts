import { Module } from '@nestjs/common';
import { patternInstanceProviders } from './providers/patternInstance.provider';
import { patternTemplateProviders } from './providers/patternTemplate.provider';
import PatternInstanceService from './services/patternInstance.service';
import PatternTemplateService from './services/patternTemplate.service';
import { DatabaseModule } from 'src/database/database.module';
import { PatternInstanceController } from './controllers/patternInstance.controller';
import { PatternTemplateController } from './controllers/patternTemplate.controller';

@Module({
  providers: [
    ...patternInstanceProviders,
    ...patternTemplateProviders,
    PatternInstanceService,
    PatternTemplateService,
  ],
  imports: [DatabaseModule],
  controllers: [PatternInstanceController, PatternTemplateController],
})
export class PatternModule {}
