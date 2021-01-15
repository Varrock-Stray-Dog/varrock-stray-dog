import { ApplyOptions } from '@sapphire/decorators';
import { Event, Events, EventOptions } from '@sapphire/framework';
import { StrayDogLogger } from 'apps/bot/src';
import { StrayDogMessage } from 'apps/bot/src/lib/extensions/message';

@ApplyOptions<EventOptions>({
    event: Events.UnknownCommand,
})
export class UnknownCommandEvent extends Event {
    public logger: StrayDogLogger = new StrayDogLogger('Command Unkown Event');

    async run(message: StrayDogMessage, name: string) {
        this.logger.warn(`"${name}" by "${message.author.tag}"`);
        message.sendWoofTranslated('commands.unkown');
    }
}
