import { GuildService } from '../../guild.service';
import { Command, Message } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';
import { woofify } from 'apps/bot/src/app/util/woof';

@Injectable()
export class PrefixGetCommand extends Command {
    constructor(private _guildService: GuildService) {
        super('prefix.get', {
            category: 'guild',
        });
    }

    async exec(message: Message) {
        const prefix = await this._guildService.getPrefix(message.guild.id);
        return message.util.send(
            woofify(`This server's prefix is: \`${prefix}\``)
        );
    }
}
