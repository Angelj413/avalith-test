import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Log4jsLogger } from './services/logger/loggerLog4js/loggerLog4js.service';
import { HttpExceptionFilter } from './utils/http/exception-filter.filter';
import { ResponseInterceptor } from './utils/http/response-interceptor.interceptor';

async function bootstrap() {
  const logger = new Log4jsLogger();
  const expressLogger = logger.getExpressLogger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Avalith Test')
    .setDescription('Sky Lending Initial Assessment')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({ origin: '*' });
  app.use(expressLogger);
  app.use(helmet());

  await app.listen(PORT);
}
bootstrap();
