import { Global, Module, OnApplicationBootstrap, Inject } from '@nestjs/common';
import {
    DISCORD_CLIENT_TOKEN,
    DISCORD_CLIENT_CONFIG_TOKEN,
    DISCORD_CLIENT_COMMANDS_TOKEN,
    DISCORD_CLIENT_INHIBITORS_TOKEN,
    DISCORD_CLIENT_LISTENERS_TOKEN,
} from './discord.constants';
import { DiscordClient } from './discord.client';
import { DiscordConfig } from './discord.interfaces';

@Global()
@Module({})
export class DiscordHostModule implements OnApplicationBootstrap {
    constructor(@Inject(DISCORD_CLIENT_TOKEN) private _client: DiscordClient) {}

    public static forRoot(config: DiscordConfig) {
        return {
            module: DiscordHostModule,
            providers: [
                {
                    provide: DISCORD_CLIENT_CONFIG_TOKEN,
                    useFactory: () => config || {},
                },
                {
                    provide: DISCORD_CLIENT_INHIBITORS_TOKEN,
                    useFactory: () => [],
                },
                {
                    provide: DISCORD_CLIENT_LISTENERS_TOKEN,
                    useFactory: () => [],
                },
                {
                    provide: DISCORD_CLIENT_COMMANDS_TOKEN,
                    useFactory: () => [],
                },
                {
                    provide: DISCORD_CLIENT_TOKEN,
                    useClass: DiscordClient,
                },
            ],
            exports: [
                DISCORD_CLIENT_CONFIG_TOKEN,
                DISCORD_CLIENT_INHIBITORS_TOKEN,
                DISCORD_CLIENT_LISTENERS_TOKEN,
                DISCORD_CLIENT_COMMANDS_TOKEN,
                DISCORD_CLIENT_TOKEN,
            ],
        };
    }

    onApplicationBootstrap() {
        this._client.init();
    }
}
