import { Redis as IRedis } from 'ioredis';
import { StrayDogLogger, CacheManager, NestjsHandler } from './libs/struct';
import { Guild } from '@prisma/client';
import {
    IPromptMessage,
    IPromptMessageOptions,
    IPromptExplicitReturn,
} from '@sapphire/discord.js-utilities';
import {
    MessageOptions,
    MessageAdditions,
    MessageOptions,
    SplitOptions,
} from 'discord.js';

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

    interface Message {
        replyPrompt(
            message: IPromptMessage,
            options?: IPromptMessageOptions
        ): IPromptExplicitReturn | boolean;

        woofSend(
            content,
            options?: MessageOptions & { split: true | SplitOptions }
        );

        public sendWoofTranslated(
            key: string,
            values?: readonly unknown[],
            options?: MessageOptions & { split: true | SplitOptions }
        ): Promise<Message[]>;
        public sendWoofTranslated(
            key: string,
            options?:
                | MessageOptions
                | (MessageOptions & { split?: false })
                | MessageAdditions
        ): Promise<Message>;
        public sendWoofTranslated(
            key: string,
            options?: MessageOptions & { split: true | SplitOptions }
        ): Promise<Message[]>;
        public sendWoofTranslated(
            key: string,
            valuesOrOptions?:
                | readonly unknown[]
                | MessageOptions
                | MessageAdditions,
            rawOptions?: MessageOptions
        ): Promise<Message | Message[]>;
    }

    interface TextChannel {
        prompt(
            message: IPromptMessageOptions,
            author: User,
            options?: IPromptMessageOptions
        ): IPromptExplicitReturn | boolean;
    }

    interface DMChannel {
        prompt(
            message: IPromptMessageOptions,
            author: User,
            options?: IPromptMessageOptions
        ): IPromptExplicitReturn | boolean;
    }

    interface NewsChannel {
        prompt(
            message: IPromptMessageOptions,
            author: User,
            options?: IPromptMessageOptions
        ): IPromptExplicitReturn | boolean;
    }
}
