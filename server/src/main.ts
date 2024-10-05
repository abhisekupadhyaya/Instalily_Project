import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('PORT') || '8000';
  const corsOrigin = configService.get<string>('CORS_ORIGIN') || 'http://localhost:3000';

  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  
  await app.listen(parseInt(port, 10));
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();