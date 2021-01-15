import {
    Structures,
    TextChannel,
    DMChannel,
    NewsChannel,
    User,
} from 'discord.js';
import {
    PromptMessage,
    IPromptMessage,
    IPromptMessageOptions,
} from '@sapphire/discord.js-utilities';

const sendPrompt = (
    channel: TextChannel | DMChannel | NewsChannel,
    author: User,
    message: IPromptMessage,
    options?: IPromptMessageOptions
) => {
    const handler = new PromptMessage(message, options);
    return handler.run(channel, author);
};

export class StrayDogTextChannel extends Structures.get('TextChannel')
    implements TextChannel {
    prompt(
        message: IPromptMessageOptions,
        author: User,
        options?: IPromptMessageOptions
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('TextChannel', () => StrayDogTextChannel);

export class StrayDogDMChannel extends Structures.get('DMChannel')
    implements DMChannel {
    prompt(
        message: IPromptMessageOptions,
        author: User,
        options?: IPromptMessageOptions
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('DMChannel', () => StrayDogDMChannel);

export class StrayDogNewsChannel extends Structures.get('NewsChannel')
    implements NewsChannel {
    prompt(
        message: IPromptMessageOptions,
        author: User,
        options?: IPromptMessageOptions
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('NewsChannel', () => StrayDogNewsChannel);
