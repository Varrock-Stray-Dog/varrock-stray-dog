import { PieceContext, Event } from '@sapphire/framework';
import { woofify } from '../../lib/util';

export class ReadyEvent extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: 'ready',
        });
    }

    run() {
        this.client.user.setActivity(`${process.env.BOT_PREFIX} 🐶`, {
            type: 'LISTENING',
        });
        this.client.logger.info(woofify('Stray Dog is ready.', false));
    }
}
