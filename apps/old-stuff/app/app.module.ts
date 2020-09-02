import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordModule } from '@varrock-stray-dog/discord';

// import { GuildModule } from './modules/guild';
// import { PetModule } from './modules/pet/pet.module';
// import { UtilModule } from './modules/util/util.module';

import { prefix as fetchPrefix } from './util/prefix';
// import { Listeners } from './listeners';

// const Modules = [UtilModule, GuildModule, PetModule];

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordModule.forRoot({
            fetchPrefix,
            shardId: 'stray-dog',
            token: process.env.BOT_TOKEN,
            plugins: [],
        }),
        // DiscordModule.forFeature({
        //     listeners: Listeners,
        // }),

        // ...Modules,
    ],
})
export class AppModule {}
