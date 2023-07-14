import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
