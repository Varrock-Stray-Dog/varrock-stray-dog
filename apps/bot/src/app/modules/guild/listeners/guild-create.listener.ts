import { Listener, Guild } from '@varrock-stray-dog/discord';
import { Logger } from '@nestjs/common';

export class GuildCreateListener extends Listener {
    private _logger: Logger = new Logger('Guild Create Listener');

    constructor() {
        super('guild-join', {
            emitter: 'client',
            event: 'guildCreate',
        });
    }

    exec(guild: Guild) {
        this._logger.log(`Joined ${guild.name}`);
    }
}
