import { SapphireClient } from '@sapphire/framework';
import { I18nContext } from '@sapphire/plugin-i18next';
import { Message } from 'discord.js';
import { join } from 'path';
import Redis, { Redis as IRedis } from 'ioredis';

import './extensions';
import './plugins';

// custom
import { StrayDogLogger, CacheManager } from './struct';
import { NestjsHandler } from './struct/nestjs-handler';
import { MODULES } from '../modules';

export class StrayDogClient extends SapphireClient {
    public readonly cache: CacheManager;
    public readonly redis: IRedis;

    public logger: StrayDogLogger = new StrayDogLogger('Stray Dog');
    public nestjs: NestjsHandler;

    public constructor(environment?: any) {
        super({
            id: environment.id,
            shards: [0],
            i18n: {
                defaultLanguageDirectory: join(__dirname, 'languages'),
            },
        });

        this.redis = new Redis(environment.redis);
        this.cache = new CacheManager(this);
        this.nestjs = new NestjsHandler(environment.redis);

        this.fetchPrefix = (message: Message) =>
            message.guild
                ? this.cache.getGuildPrefix(message.guild.id)
                : process.env.BOT_PREFIX;
        this.fetchLanguage = async (context: I18nContext) =>
            context.guild ? this.cache.getLanguage(context.guild.id) : 'en-US';

        this._registerPieces();
    }

    private _registerPieces() {
        for (let module of MODULES) {
            this.arguments.registerPath(
                join(__dirname, 'modules', module, 'arguments')
            );
            this.commands.registerPath(
                join(__dirname, 'modules', module, 'commands')
            );
            this.events.registerPath(
                join(__dirname, 'modules', module, 'events')
            );
        }
    }
}
