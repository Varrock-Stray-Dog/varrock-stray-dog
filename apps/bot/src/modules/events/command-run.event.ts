import { PieceContext, Event, Events } from '@sapphire/framework';
import { woofify } from '../../lib/util';

export class MessageRunEvent extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: Events.CommandRun,
        });
    }

    run(message, command, parameters, name, prefix) {
        this.client.logger.info(woofify(`Running command "${name}"`, false));
    }
}
