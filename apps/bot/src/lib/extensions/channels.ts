import {
    Structures,
    TextChannel,
    DMChannel,
    NewsChannel,
    User,
} from 'discord.js';
import {
    MessagePrompter,
    IMessagePrompterMessage,
    IMessagePrompterOptions,
} from '@sapphire/discord.js-utilities';

const sendPrompt = (
    channel: TextChannel | DMChannel | NewsChannel,
    author: User,
    message: IMessagePrompterMessage,
    options?: IMessagePrompterOptions
) => {
    const handler = new MessagePrompter(message, options);
    return handler.run(channel, author);
};

export class StrayDogTextChannel extends Structures.get('TextChannel')
    implements TextChannel {
    prompt(
        message: IMessagePrompterOptions,
        author: User,
        options?: IMessagePrompterOptions
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('TextChannel', () => StrayDogTextChannel);

export class StrayDogDMChannel extends Structures.get('DMChannel')
    implements DMChannel {
    prompt(
        message: IMessagePrompterOptions,
        author: User,
        options?: IMessagePrompterOptions
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('DMChannel', () => StrayDogDMChannel);

export class StrayDogNewsChannel extends Structures.get('NewsChannel')
    implements NewsChannel {
    prompt(
        message: IMessagePrompterOptions,
        author: User,
        options?: IMessagePrompterOptions
    ) {
        return sendPrompt(this, author, message, options);
    }
}
Structures.extend('NewsChannel', () => StrayDogNewsChannel);
