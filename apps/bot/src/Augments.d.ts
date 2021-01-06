import { Redis as IRedis } from 'ioredis';
import { StrayDogLogger, CacheManager, NestjsHandler } from './libs/struct';

declare module 'discord.js' {
    interface Client {
        readonly cache: CacheManager;
        readonly redis: IRedis;

        logger: StrayDogLogger;
        nestjs: NestjsHandler;
    }
}
