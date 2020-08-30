import { GuildService } from '../../guild.service';
import { Command, Message } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrefixCommand extends Command {
    constructor(private _guildService: GuildService) {
        super('prefix', {
            aliases: ['prefix'],
            category: 'guild',
        });
    }

    async exec(message: Message) {
        const prefix = await this._guildService.getPrefix(message.guild.id);
        return message.util.send(`This server's prefix is: \`${prefix}\``);
    }
}
