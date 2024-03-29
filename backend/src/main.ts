import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({origin: false});
  app.enableCors({origin: 'http://localhost:4200'});

  await app.listen(3000);
}
bootstrap();

