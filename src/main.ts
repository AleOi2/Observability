import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './otel/otel';  // Import OTEL before anything else

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();