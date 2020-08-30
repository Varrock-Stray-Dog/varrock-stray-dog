import { Command, Flag } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';

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
                examples: ['show'],
            },
            flags: ['--all'],
        });
    }

    public *args() {
        const method = yield {
            type: [['pets.show', 'show']],
            default: 'pets.show',
            match: 'phrase',
        };

        return Flag.continue(method);
    }
}
