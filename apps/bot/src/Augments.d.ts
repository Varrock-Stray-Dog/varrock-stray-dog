import { Redis as IRedis } from 'ioredis';
import { StrayDogLogger, CacheManager, NestjsHandler } from './libs/struct';
import { Guild } from '@prisma/client';

declare module 'discord.js' {
    interface Client {
        readonly cache: CacheManager;
        readonly redis: IRedis;

        logger: StrayDogLogger;
        nestjs: NestjsHandler;
    }

    interface Guild {
        databaseInstance(): Guild;
    }
}
