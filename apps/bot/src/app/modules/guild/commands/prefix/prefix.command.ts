import { Command, Flag } from '@varrock-stray-dog/discord';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            category: 'guild',
            ratelimit: 2,
            description: {
                content: 'prefix',
                usage: '<method>',
                examples: ['get', 'set <prefix>'],
            },
        });
    }

    public *args() {
        const method = yield {
            type: [
                ['prefix.get', 'get', 'g'],
                ['prefix.set', 'set', 's'],
            ],
        };

        if (!method) {
            return Flag.continue('prefix.get');
        }

        return Flag.continue(method);
    }
}
