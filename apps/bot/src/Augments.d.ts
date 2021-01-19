import { Redis as IRedis } from 'ioredis';
import { StrayDogLogger, CacheManager, NestjsHandler } from './libs/struct';
import { Guild } from '@prisma/client';
import {
    IMessagePrompterMessage,
    IMessagePrompterOptions,
    IMessagePrompterExplicitReturn,
    IMessagePrompterOptionsType,
    IMessagePrompterReturn,
} from '@sapphire/discord.js-utilities';
import {
    MessageOptions,
    MessageAdditions,
    MessageOptions,
    SplitOptions,
    StringResolvable,
} from 'discord.js';
import { SettingsModel } from '@varrock-stray-dog/models';

interface ChannelExtendables {
    readonly attachable: boolean;
    readonly embedable: boolean;
    readonly postable: boolean;
    readonly readable: boolean;

    woofSend(
        content: StringResolvable,
        options?: (MessageOptions & { split?: false }) | MessageAdditions
    );

    prompt(
        message: IMessagePrompterMessage,
        author: User,
        options?: Partial<IMessagePrompterOptions> | IMessagePrompterOptionsType
    ): Promise<IMessagePrompterReturn>;
}

declare global {
    interface Array<T> {
        chunk(chunkSize: number): T[][];
    }
}

declare module 'discord.js' {
    interface Client {
        readonly cache: CacheManager;
        readonly redis: IRedis;

        ownerId: string | undefined;

        logger: StrayDogLogger;
        nestjs: NestjsHandler;

        invite: string;
    }

    interface Guild {
        settings(): Promise<SettingsModel>;
    }

    interface Message {
        prompt(
            message: IMessagePrompterMessage,
            options?:
                | Partial<IMessagePrompterOptions>
                | IMessagePrompterOptionsType
        ): Promise<IMessagePrompterReturn>;

        woofReply(
            content,
            options?: MessageOptions & { split: true | SplitOptions }
        );

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

    interface TextChannel extends ChannelExtendables {}

    interface DMChannel extends ChannelExtendables {}

    interface NewsChannel extends ChannelExtendables {}
}
