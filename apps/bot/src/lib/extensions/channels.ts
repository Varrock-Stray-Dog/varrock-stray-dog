import {
    Structures,
    TextChannel,
    DMChannel,
    NewsChannel,
    User,
    Permissions,
} from 'discord.js';
import {
    MessagePrompter,
    IMessagePrompterMessage,
    IMessagePrompterOptions,
    IMessagePrompterOptionsType,
} from '@sapphire/discord.js-utilities';
import { StringResolvable } from 'discord.js';
import { MessageOptions } from 'discord.js';
import { MessageAdditions } from 'discord.js';
import { woofify } from '../util/woofiy';

const sendPrompt = (
    channel: TextChannel | DMChannel,
    author: User,
    message: IMessagePrompterMessage,
    options?: Partial<IMessagePrompterOptions> | IMessagePrompterOptionsType
) => {
    const handler = new MessagePrompter(message, options);
    return handler.run(channel, author);
};

export class StrayDogTextChannel extends Structures.get('TextChannel')
    implements TextChannel {
    woofSend(
        content: StringResolvable,
        options?: (MessageOptions & { split?: false }) | MessageAdditions
    ) {
        this.send(woofify(content), options);
    }

    prompt(
        message: IMessagePrompterMessage,
        author: User,
        options?: Partial<IMessagePrompterOptions> | IMessagePrompterOptionsType
    ) {
        return sendPrompt(this, author, message, options);
    }

    public get attachable() {
        return (
            !this.guild ||
            (this.postable &&
                this.permissionsFor(this.guild.me!)!.has(
                    Permissions.FLAGS.ATTACH_FILES,
                    false
                ))
        );
    }

    public get embedable() {
        return (
            !this.guild ||
            (this.postable &&
                this.permissionsFor(this.guild.me!)!.has(
                    Permissions.FLAGS.EMBED_LINKS,
                    false
                ))
        );
    }

    public get postable() {
        return (
            !this.guild ||
            this.permissionsFor(this.guild.me!)!.has(
                [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.SEND_MESSAGES,
                ],
                false
            )
        );
    }

    public get readable() {
        return (
            !this.guild ||
            this.permissionsFor(this.guild.me!)!.has(
                Permissions.FLAGS.VIEW_CHANNEL,
                false
            )
        );
    }
}
Structures.extend('TextChannel', () => StrayDogTextChannel);

export class StrayDogDMChannel extends Structures.get('DMChannel')
    implements DMChannel {
    public readonly attachable = true;

    public readonly embedable = true;

    public readonly postable = true;

    public readonly readable = true;

    woofSend(
        content: StringResolvable,
        options?: (MessageOptions & { split?: false }) | MessageAdditions
    ) {
        this.send(woofify(content), options);
    }

    prompt(
        message: IMessagePrompterMessage,
        author: User,
        options?: Partial<IMessagePrompterOptions> | IMessagePrompterOptionsType
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('DMChannel', () => StrayDogDMChannel);
