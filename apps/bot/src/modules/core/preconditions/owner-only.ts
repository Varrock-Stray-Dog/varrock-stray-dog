import { PieceContext, Precondition } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class extends Precondition {
    constructor(context: PieceContext) {
        super(context, {
            name: 'OwnerOnly',
        });
    }

    public async run(message: Message) {
        return this.context.client.ownerId === message.author.id
            ? this.ok()
            : this.error(
                  this.name,
                  'This command can only be used by the owner.'
              );
    }
}
