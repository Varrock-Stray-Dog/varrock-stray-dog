import { PrefixSupplier } from 'discord-akairo';
import { Message } from '@varrock-stray-dog/discord';
import { PrismaClient } from '../prisma.client';

const prefixPrismaClient = new PrismaClient();

export const prefix: PrefixSupplier = async (message: Message) => {
    const guild = await prefixPrismaClient.guild.findOne({
        where: {
            discord_id: message.guild?.id,
        },
    });

    if (!guild) {
        return process.env.BOT_PREFIX;
    }

    return guild.prefix;
};
