import { GuildService } from '../guild.service';
import { Command, CommandHandler } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuildCommand extends Command {
    constructor(private _guildService: GuildService) {
        super('guild', {
            aliases: ['guild'],
        });
    }

    exec(message) {
        const guild = this._guildService.guildById(message.guild.id);
        return message.reply(`\`\`\`\n${JSON.stringify(guild)}\n\`\`\``);
    }
}
