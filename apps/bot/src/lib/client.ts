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

    public logger: StrayDogLogger = new StrayDogLogger('Stray Dog Client');
    public nestjs: NestjsHandler;

    private _apiRetries = 10;

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

    async checkApi(count = 1) {
        this.logger.info('Connecting to api');
        return this.nestjs.send('ping', null, 2000).catch((e) => {
            if (e === 'Timeout') {
                if (count >= this._apiRetries) {
                    this.logger.error(
                        'Could not connect to api, stopping process.'
                    );
                    process.exit(1);
                }

                this.logger.warn('Api timeout occured, retrying.');
                return this.checkApi(count + 1);
            }

            throw new Error(e);
        });
    }

    private _registerPieces() {
        for (const module of MODULES) {
            const path = typeof module === 'string' ? module : module?.path;
            const enabled = typeof module === 'string' || module?.enabled;

            if (enabled) {
                this.arguments.registerPath(
                    join(__dirname, 'modules', path, 'arguments')
                );
                this.commands.registerPath(
                    join(__dirname, 'modules', path, 'commands')
                );
                this.events.registerPath(
                    join(__dirname, 'modules', path, 'events')
                );
                this.preconditions.registerPath(
                    join(__dirname, 'modules', path, 'preconditions')
                );
            }
        }
    }
}
