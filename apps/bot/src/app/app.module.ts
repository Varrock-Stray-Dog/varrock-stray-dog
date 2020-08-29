import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GuildModule } from './modules/guild';
import { DiscordModule } from '@varrock-stray-dog/discord';
import { UserModule } from './modules/user/user.module';

const Modules = [GuildModule, UserModule];

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordModule.forRoot({
            defaultPrefix: '!',
            shardId: 'stray-dog',
            token: process.env.BOT_TOKEN,
            ownerID: process.env.OWNER_ID,
        }),

        ...Modules,
    ],
    exports: [],
})
export class AppModule {}
