import { Module } from '@nestjs/common';
import { Commands } from './commands';
import { DiscordModule } from '@varrock-stray-dog/discord';

@Module({
    imports: [
        DiscordModule.forFeature({
            commands: Commands,
        }),
    ],
    controllers: [],
    providers: [],
})
export class UserModule {}
