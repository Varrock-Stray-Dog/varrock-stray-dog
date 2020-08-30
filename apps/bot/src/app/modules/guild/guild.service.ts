import { Injectable, Inject } from '@nestjs/common';
import {
    DiscordClient,
    DISCORD_CLIENT_TOKEN,
} from '@varrock-stray-dog/discord';

@Injectable()
export class GuildService {
    constructor(private _client: DiscordClient) {}

    public guildById(id) {
        return this._client.guilds.resolve(id);
    }
}
