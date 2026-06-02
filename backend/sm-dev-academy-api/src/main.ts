import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(
    express.json({
      limit: '5mb',
    }),
  );

  app.use(
    express.urlencoded({
      limit: '5mb',
      extended: true,
    }),
  );

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SM Dev Academy API')
    .setDescription('Backend API for SM Dev Academy platform')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup(
    'api',
    app,
    swaggerDocument,
  );

  await app.listen(process.env.PORT ?? 3000);

}

bootstrap();