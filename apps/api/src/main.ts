/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

    const options = new DocumentBuilder()
        .setTitle('Varrock Stray Dog')
        .setDescription('The varrock stray dog API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('openapi', app, document);

    const port = process.env.PORT || 3000;
    await app.startAllMicroservicesAsync();
    await app.listen(port, () => logger.log('Listening at ' + port));
})();
