import { Injectable, Inject } from '@nestjs/common';
import {
    DiscordClient,
    DISCORD_CLIENT_TOKEN,
} from '@varrock-stray-dog/discord';

import { PrismaClient } from '../../prisma.client';

@Injectable()
export class GuildService {
    constructor(
        private _client: DiscordClient,
        private _prisma: PrismaClient
    ) {}

    public guildById(id: string) {
        return this._client.guilds.resolve(id);
    }

    async findOrCreate(id: string) {
        const guild = await this._prisma.guild.findOne({
            where: {
                discord_id: id,
            },
        });

        if (!guild) {
            return this._prisma.guild.create({
                data: {
                    discord_id: id,
                    prefix: process.env.BOT_PREFIX,
                },
            });
        }

        return guild;
    }

    public async getPrefix(id: string) {
        const guild = await this._prisma.guild.findOne({
            where: {
                discord_id: id,
            },
        });

        if (!guild) {
            return process.env.BOT_PREFIX;
        }

        return guild.prefix;
    }

    public setPrefix(id: string, prefix: string) {
        return this._prisma.guild.update({
            data: {
                prefix,
            },
            where: {
                discord_id: id,
            },
        });
    }
}
