import { Injectable } from '@nestjs/common';

import { PrismaClient } from '../prisma/prisma.client';

@Injectable()
export class SettingsService {
    constructor(private _prisma: PrismaClient) {}

    public byGuildId(guildId: string) {
        return this._prisma.settings.findOne({
            where: {
                guildId,
            },
        });
    }

    async findOneByGuildId(guildId: string) {
        return this._prisma.settings.findOne({
            where: {
                guildId,
            },
        });
    }

    async findOrCreate(guildId: string) {
        const guild = await this.findOneByGuildId(guildId);

        if (!guild) {
            return this._prisma.settings.create({
                data: {
                    guildId,
                    prefix: process.env.BOT_PREFIX,
                },
            });
        }

        return guild;
    }

    public async getPrefix(guildId: string) {
        const guild = await this._prisma.settings.findOne({
            where: {
                guildId,
            },
        });

        if (!guild) {
            return process.env.BOT_PREFIX;
        }

        return guild.prefix;
    }

    public setPrefix(guildId: string, prefix: string) {
        return this._prisma.settings.update({
            data: {
                prefix,
            },
            where: {
                guildId,
            },
        });
    }
}
