import { Module } from '@nestjs/common';
import { DiscordModule } from '@varrock-stray-dog/discord';
import { PrismaClient } from '../../prisma.client';

import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';

import { Commands } from './commands';
import { Listeners } from './listeners';

@Module({
    imports: [
        DiscordModule.forFeature({
            commands: Commands,
            listeners: Listeners,
            inject: [GuildService, PrismaClient],
        }),
    ],
    controllers: [GuildController],
    providers: [GuildService, PrismaClient],
})
export class GuildModule {}
