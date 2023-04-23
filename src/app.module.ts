import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    WinstonModule.forRoot({
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.colorize()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike())
        })
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
