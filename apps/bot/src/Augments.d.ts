import { Redis as IRedis } from 'ioredis';
import { StrayDogLogger, CacheManager, NestjsHandler } from './libs/struct';
import { Guild } from '@prisma/client';
import {
    IMessagePrompterMessage,
    IMessagePrompterOptions,
    IMessagePrompterExplicitReturn,
} from '@sapphire/discord.js-utilities';
import {
    MessageOptions,
    MessageAdditions,
    MessageOptions,
    SplitOptions,
} from 'discord.js';
import { SettingsModel } from '@varrock-stray-dog/models';

declare module 'discord.js' {
    interface Client {
        readonly cache: CacheManager;
        readonly redis: IRedis;

        logger: StrayDogLogger;
        nestjs: NestjsHandler;
    }

    interface Guild {
        settings(): Promise<SettingsModel>;
    }

    interface Message {
        replyPrompt(
            message: IMessagePrompterMessage,
            options?: IMessagePrompterOptions
        ): Promise<IMessagePrompterExplicitReturn | boolean>;

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
            message: IMessagePrompterMessage,
            author: User,
            options?: IMessagePrompterOptions
        ): Promise<IMessagePrompterExplicitReturn | boolean>;
    }

    interface DMChannel {
        prompt(
            message: IMessagePrompterMessage,
            author: User,
            options?: IMessagePrompterOptions
        ): Promise<IMessagePrompterExplicitReturn | boolean>;
    }

    interface NewsChannel {
        prompt(
            message: IMessagePrompterMessage,
            author: User,
            options?: IMessagePrompterOptions
        ): Promise<IMessagePrompterExplicitReturn | boolean>;
    }
}
