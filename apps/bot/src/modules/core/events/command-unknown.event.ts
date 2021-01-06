import { PieceContext, Event, Events } from '@sapphire/framework';
import { StrayDogMessage } from 'apps/bot/src/lib/extensions/message';

export class UnknownCommandEvent extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: Events.UnknownCommand,
        });
    }

    run(message: StrayDogMessage, name: string) {
        this.context.client.logger.warn(
            `[Unkown Command] "${name}" by "${message.author.tag}"`
        );
        message.sendWoofTranslated('default:COMMANDS.UNKNOWN');
    }
}
