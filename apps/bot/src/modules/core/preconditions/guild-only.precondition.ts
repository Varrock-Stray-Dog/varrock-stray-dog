import { PieceContext, Precondition } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class extends Precondition {
    constructor(context: PieceContext) {
        super(context, {
            name: 'GuildOnly',
        });
    }

    public async run(message: Message) {
        return !!message.guild
            ? this.ok()
            : this.error(
                  this.name,
                  'This command can only be used in a guild.'
              );
    }
}
