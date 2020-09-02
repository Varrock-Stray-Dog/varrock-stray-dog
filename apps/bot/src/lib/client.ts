import { SapphireClient } from '@sapphire/framework';
import { Message } from 'discord.js';
import { join } from 'path';
import Redis, { Redis as IRedis } from 'ioredis';

// extensions
import './extensions/message';

// plugins
import '@scp/in17n/register';

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
        });

        this.redis = new Redis(environment.redis);
        this.cache = new CacheManager(this);
        this.nestjs = new NestjsHandler(environment.redis);

        this.fetchPrefix = (message: Message) =>
            message.guild
                ? this.cache.getGuildPrefix(message.guild.id)
                : process.env.BOT_PREFIX;
        this.fetchLanguage = async (message: Message) =>
            message.guild ? this.cache.getLanguage(message.guild.id) : 'en-US';

        this._registerPieces();
    }

    private _registerPieces() {
        this.arguments.registerPath(join(__dirname, 'modules', 'arguments'));
        this.commands.registerPath(join(__dirname, 'modules', 'commands'));
        this.events.registerPath(join(__dirname, 'modules', 'events'));

        for (let module of MODULES) {
            this.arguments.registerPath(
                join(__dirname, 'modules', module.folder, 'arguments')
            );
            this.commands.registerPath(
                join(__dirname, 'modules', module.folder, 'commands')
            );
            this.events.registerPath(
                join(__dirname, 'modules', module.folder, 'events')
            );
        }
    }
}
