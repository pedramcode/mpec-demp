import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { PatternModule } from './pattern/pattern.module';
import { ExampleModule } from './example/example.module';
import { AiModule } from './ai/ai.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    }),
    DatabaseModule,
    CourseModule,
    PatternModule,
    ExampleModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
