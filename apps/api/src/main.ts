/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

const logger = new Logger('Main');

(async () => {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.REDIS,
        options: {
            url: process.env.REDIS_URL,
        },
    });

    const port = process.env.PORT || 3000;
    await app.startAllMicroservicesAsync();
    await app.listen(port, () => logger.log('Listening at ' + port));
})();
