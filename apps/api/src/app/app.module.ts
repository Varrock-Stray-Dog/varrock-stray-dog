import { Module } from '@nestjs/common';

import { GuildModule } from './modules/guild/guild.module';

@Module({
    imports: [GuildModule],
})
export class AppModule {}
