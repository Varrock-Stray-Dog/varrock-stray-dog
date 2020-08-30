import { Command, Flag } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';
import { prefix } from '../../../util/prefix';

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
            type: [['pets.list', 'list']],
            otherwise: (message) =>
                `**Woof!**\nCheckout \`${prefix(
                    message
                )}help pets\` on how to use this command`,
        };

        return Flag.continue(method);
    }
}
