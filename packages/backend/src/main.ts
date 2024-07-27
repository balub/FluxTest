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

  const whitelist = process.env.WHITELISTED_ORIGINS.split(',').map((origin) =>
    origin.trim(),
  );
  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT || 3170);
}
bootstrap();
