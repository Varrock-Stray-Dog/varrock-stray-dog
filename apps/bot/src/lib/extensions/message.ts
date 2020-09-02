import { SapphireMessage } from '@sapphire/framework';
import {
    Message,
    MessageAdditions,
    MessageOptions,
    SplitOptions,
    Structures,
} from 'discord.js';
import { woofify } from '../util';

export class StrayDogMessage extends Structures.get('Message')
    implements SapphireMessage {
    woofSend(
        content,
        options?: MessageOptions & { split: true | SplitOptions }
    ) {
        this.channel.send(woofify(content), options);
    }

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
    public async sendWoofTranslated(
        key: string,
        valuesOrOptions?:
            | readonly unknown[]
            | MessageOptions
            | MessageAdditions,
        rawOptions?: MessageOptions
    ): Promise<Message | Message[]> {
        const [values, options]: [unknown[], MessageOptions] =
            typeof valuesOrOptions === 'undefined' ||
            Array.isArray(valuesOrOptions)
                ? [valuesOrOptions ?? [], rawOptions ?? {}]
                : [[], valuesOrOptions as MessageOptions];
        const content = await this.fetchLanguageKey(key, ...values);
        return this.channel.send(woofify(content), options);
    }
}

Structures.extend('Message', () => StrayDogMessage);
