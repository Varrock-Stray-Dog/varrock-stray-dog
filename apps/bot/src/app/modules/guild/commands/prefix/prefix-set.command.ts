import { GuildService } from '../../guild.service';
import { Command, Message } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';
import { woofify } from 'apps/bot/src/app/util/woof';

@Injectable()
export class PrefixSetCommand extends Command {
    constructor(private _guildService: GuildService) {
        super('prefix.set', {
            category: 'guild',
            args: [
                {
                    id: 'prefix',
                    type: 'string',
                },
            ],
        });
    }

    async exec(message: Message, { prefix }: { prefix: string }) {
        await this._guildService.setPrefix(message.guild.id, prefix);
        return message.util.send(
            woofify(`:tada: Updated prefix to: \`${prefix}\``)
        );
    }
}
