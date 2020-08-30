import { GuildService } from '../guild.service';
import { Command, Message } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuildCommand extends Command {
    constructor(private _guildService: GuildService) {
        super('guild', {
            aliases: ['guild'],
        });
    }

    exec(message: Message) {
        console.log(this._guildService.constructor.name);
        const guild = this._guildService.guildById(message.guild.id);
        return message.reply(`\`\`\`\n${JSON.stringify(guild)}\n\`\`\``);
    }
}
