import { PrefixSupplier } from 'discord-akairo';
import { Message } from '@varrock-stray-dog/discord';

export const prefix: PrefixSupplier = (message: Message) =>
    `${process.env.BOT_PREFIX}`;
