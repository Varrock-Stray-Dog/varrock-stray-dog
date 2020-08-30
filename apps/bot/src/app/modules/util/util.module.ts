import { Module } from '@nestjs/common';
import { DiscordModule } from '@varrock-stray-dog/discord';

import { Commands } from './commands';

@Module({
    imports: [
        DiscordModule.forFeature({
            commands: Commands,
        }),
    ],
})
export class UtilModule {}
