import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('NODE_PORT');
  const envApp = configService.get('NODE_ENV');

  app.setGlobalPrefix(configService.get('GLOBAL_PREFIX'));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // await app.listen();
  await app.listen(port, () => {
    Logger.log(`${envApp} Server is running on ${port}`, `Application Server`);
  });
}
bootstrap();
