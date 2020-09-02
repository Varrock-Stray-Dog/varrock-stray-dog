import { PieceContext, Event, Events } from '@sapphire/framework';
import { woofify } from '../../lib/util';

export class MessageCommandUnkown extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: Events.UnknownCommand,
        });
    }

    run(message, name, prefix) {
        this.client.logger.warn(
            '[MessageCommandUnkown] ' +
                woofify(`Unkown command "${name}"`, false)
        );
        message.sendWoofTranslated('default:COMMANDS.UNKNOWN');
    }
}
