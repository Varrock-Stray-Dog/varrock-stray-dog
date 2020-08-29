/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { Transport } from '@nestjs/microservices';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
	transport: Transport.REDIS,
	options: {
		url: process.env.REDIS_URL,
	},
  });

  await app.listen(() => logger.log('Listening to messages'));
}

bootstrap();
