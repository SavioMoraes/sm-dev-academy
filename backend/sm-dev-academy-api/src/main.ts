import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

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