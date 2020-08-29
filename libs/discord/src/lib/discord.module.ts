import { Module, Inject } from '@nestjs/common';
import { DiscordConfig, DiscordFeatureConfig } from './discord.interfaces';
import { DiscordClient } from './discord.client';
import {
    DISCORD_CLIENT_TOKEN,
    DISCORD_CLIENT_COMMANDS_TOKEN,
    DISCORD_CLIENT_INHIBITORS_TOKEN,
    DISCORD_CLIENT_LISTENERS_TOKEN,
} from './discord.constants';
import { DiscordHostModule } from './discord.host-module';
import { Command, Inhibitor, Listener } from 'discord-akairo';
import {
    createCommandProviders,
    createInjectProviders,
    createInhibitorProviders,
    createListenerProviders,
} from './util/create-providers';

@Module({
    providers: [
        {
            provide: DiscordClient,
            useExisting: DISCORD_CLIENT_TOKEN,
        },
    ],
    exports: [DiscordClient],
})
export class DiscordModule {
    constructor(
        private _client: DiscordClient,
        @Inject(DISCORD_CLIENT_INHIBITORS_TOKEN)
        private _inhibitors: Inhibitor[],
        @Inject(DISCORD_CLIENT_LISTENERS_TOKEN)
        private _listeners: Listener[],
        @Inject(DISCORD_CLIENT_COMMANDS_TOKEN)
        private _commands: Command[]
    ) {
        this._client.registerInhibitors(this._inhibitors);
        this._client.registerListeners(this._listeners);
        this._client.registerCommands(this._commands);
    }

    public static forRoot(config?: DiscordConfig) {
        return {
            module: DiscordModule,
            imports: [DiscordHostModule.forRoot(config)],
            providers: [
                {
                    provide: DiscordClient,
                    useFactory: (client: DiscordClient) => client,
                    inject: [DISCORD_CLIENT_TOKEN],
                },
            ],
            exports: [DiscordHostModule, DiscordClient],
        };
    }

    public static forFeature({
        commands,
        inhibitors,
        listeners,
        inject,
    }: DiscordFeatureConfig) {
        return {
            module: DiscordModule,
            providers: [
                ...createInjectProviders(inject),
                ...createInhibitorProviders(inhibitors, inject),
                ...createListenerProviders(listeners, inject),
                ...createCommandProviders(commands, inject),
                {
                    provide: DiscordClient,
                    useFactory: (client: DiscordClient) => client,
                    inject: [DISCORD_CLIENT_TOKEN],
                },
            ],
            exports: [DiscordClient],
        };
    }
}
