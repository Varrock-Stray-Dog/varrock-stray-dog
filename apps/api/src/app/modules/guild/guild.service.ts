import { Injectable } from '@nestjs/common';

import { PrismaClient } from '../prisma/prisma.client';

@Injectable()
export class GuildService {
    constructor(private _prisma: PrismaClient) {}

    public guildById(id: string) {
        return this._prisma.guild.findOne({
            where: {
                discord_id: id,
            },
        });
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
