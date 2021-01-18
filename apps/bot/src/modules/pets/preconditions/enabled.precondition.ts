import { PieceContext, Precondition } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class extends Precondition {
    constructor(context: PieceContext) {
        super(context, {
            name: 'PetsEnabled',
        });
    }

    public async run(message: Message) {
        const settings = await message.guild.settings();

        return settings?.pets?.enabled
            ? this.ok()
            : this.error(
                  this.name,
                  `Pets not enabled for guild "${message.guild.name}"`
              );
    }
}
