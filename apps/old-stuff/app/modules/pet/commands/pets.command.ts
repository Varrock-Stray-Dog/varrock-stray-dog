import { Command, Flag, PrefixSupplier } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';
import { prefix } from '../../../util/prefix';
import { woofify } from '../../../util/woof';

@Injectable()
export class PetsCommand extends Command {
    constructor() {
        super('pets', {
            aliases: ['pets', 'pet', 'p'],
            category: 'pets',
            ratelimit: 2,
            description: {
                content: 'pets command',
                usage: '<method> <...arguments>',
                examples: ['list'],
            },
            flags: ['--all'],
        });
    }

    public *args() {
        const method = yield {
            type: [
                ['pets.list', 'list', 'l'],
                ['pets.add', 'add', 'a'],
            ],
            otherwise: async (message) => {
                const prefix = await (this.handler.prefix as PrefixSupplier)(
                    message
                );
                return woofify(
                    `Checkout \`${prefix}help pets\` on how to use this command`
                );
            },
        };

        return Flag.continue(method);
    }
}
