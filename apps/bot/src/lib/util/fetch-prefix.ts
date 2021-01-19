import { Message } from 'discord.js';

export const fetchPrefix = async (message: Message): Promise<string> => {
    const guild = message.guild;
    if (!guild) {
        return process.env.BOT_PREFIX;
    }

    const { prefix } = await guild.settings();
    return prefix;
};
