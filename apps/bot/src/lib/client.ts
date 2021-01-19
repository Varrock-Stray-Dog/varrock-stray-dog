import { SapphireClient } from '@sapphire/framework';
import { join } from 'path';
import Redis, { Redis as IRedis } from 'ioredis';

import './extensions';
import './plugins';

// custom
import { StrayDogLogger } from './struct';
import { NestjsHandler } from './struct/nestjs-handler';
import { MODULES } from '../modules';
import { fetchLanguage } from './util/fetch-language';
import { fetchPrefix } from './util/fetch-prefix';

export class StrayDogClient extends SapphireClient {
    public readonly redis: IRedis;

    public logger: StrayDogLogger = new StrayDogLogger('Stray Dog Client');
    public nestjs: NestjsHandler;

    public ownerId: string | undefined = process.env.OWNER_ID;

    private _apiRetries = 10;

    public constructor(environment?: any) {
        super({
            id: environment.id,
            shards: [0],
            i18n: {
                defaultLanguageDirectory: join(__dirname, 'languages'),
            },
            ws: {
                intents: [
                    'GUILD_MEMBERS',
                    'GUILD_MESSAGES',
                    'GUILDS',
                    'DIRECT_MESSAGES',
                    'GUILD_MESSAGE_REACTIONS',
                ],
            },
        });

        this.redis = new Redis(environment.redis);
        this.nestjs = new NestjsHandler(environment.redis);

        this.fetchPrefix = fetchPrefix;
        this.fetchLanguage = fetchLanguage;

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
            const { path, enabled } = module;

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
