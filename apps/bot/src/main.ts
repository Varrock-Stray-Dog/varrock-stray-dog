/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import './app/util/array';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.REDIS,
        options: {
            url: process.env.REDIS_URL,
        },
    });

    await app.listen(null);
}

bootstrap();
