import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordModule } from '@varrock-stray-dog/discord';

import { GuildModule } from './modules/guild';
import { PetModule } from './modules/pet/pet.module';
import { UtilModule } from './modules/util/util.module';

import { prefix } from './util/prefix';

const Modules = [UtilModule, GuildModule, PetModule];

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordModule.forRoot({
            defaultPrefix: prefix,
            shardId: 'stray-dog',
            token: process.env.BOT_TOKEN,
            ownerID: process.env.OWNER_ID,
        }),

        ...Modules,
    ],
})
export class AppModule {}
