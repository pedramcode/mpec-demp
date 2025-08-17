import { Module } from '@nestjs/common';
import { MpecService } from './mpec.service';
import { DatabaseModule } from 'src/database/database.module';
import { entityProviders } from './providers';

@Module({
  providers: [...entityProviders, MpecService],
  imports: [DatabaseModule],
})
export class MpecModule {}
