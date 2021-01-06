import { PieceContext, Event, Events } from '@sapphire/framework';
import { woofify } from '../../../lib/util';

export class CommandRunEvent extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: Events.CommandRun,
        });
    }

    run(message, command, parameters, name, prefix) {
        this.context.client.logger.info(
            woofify(`[Command Run] "${name}" by "${message.author.tag}"`, false)
        );
    }
}
