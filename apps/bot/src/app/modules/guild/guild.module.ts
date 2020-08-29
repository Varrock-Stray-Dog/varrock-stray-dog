import { Module } from '@nestjs/common';
import { DiscordModule } from '@varrock-stray-dog/discord';

import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';

import { Commands } from './commands';
import { Listeners } from './listeners';

@Module({
    imports: [
        DiscordModule.forFeature({
            commands: Commands,
            listeners: Listeners,
            inject: [GuildService],
        }),
    ],
    controllers: [GuildController],
    providers: [GuildService],
})
export class GuildModule {}
