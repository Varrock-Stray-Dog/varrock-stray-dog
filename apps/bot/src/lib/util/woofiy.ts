import { MessageOptions, StringResolvable, MessageAdditions } from 'discord.js';

export const woofifyString = (str: string, isMessage = true) =>
    `🐶 ${isMessage ? '**' : ''}Woof!${isMessage ? '**\n' : ' '}${str ?? ''}`;
export const woofify = (
    content?:
        | StringResolvable
        | (MessageOptions & { split?: false })
        | MessageAdditions,
    isMessage = true
) => {
    if (typeof content !== 'string') {
        content.content = woofifyString(content.content, isMessage);
        return content;
    }

    return woofifyString(content, isMessage);
};
