import { Listener, Guild } from '@varrock-stray-dog/discord';
import { Logger, Injectable } from '@nestjs/common';
import { GuildService } from '../guild.service';

@Injectable()
export class GuildCreateListener extends Listener {
    private _logger: Logger = new Logger('Guild Create Listener');

    constructor(private _guildService: GuildService) {
        super('guild.create', {
            emitter: 'client',
            event: 'guildCreate',
        });
    }

    async exec(guild: Guild) {
        this._logger.log(`Joined ${guild.name}`);
        await this._guildService.findOrCreate(guild.id);
    }
}
