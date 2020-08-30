import {
    Collection,
    Message,
    TextChannel,
    User,
} from '@varrock-stray-dog/discord';
import Prompter from 'discordjs-prompter';

export const prompt = (
    channel: TextChannel,
    author: User,
    message: string,
    max: number = 1,
    timeout: number = 30000
): Promise<Collection<string, Message>> =>
    Prompter.message(channel as TextChannel, {
        question: message,
        userId: author.id,
        max,
        timeout,
    }) as Promise<Collection<string, Message>>;
