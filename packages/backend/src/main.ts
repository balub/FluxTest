import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`Port: ${process.env.PORT}`);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
    }),
  );

  app.enableCors({
    origin: process.env.WHITELISTED_ORIGINS,
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT || 3170);
}
bootstrap();
