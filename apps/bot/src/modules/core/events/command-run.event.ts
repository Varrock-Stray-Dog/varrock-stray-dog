import { ApplyOptions } from '@sapphire/decorators';
import { Event, Events, EventOptions } from '@sapphire/framework';
import { StrayDogLogger } from 'apps/bot/src';
import { woofify } from '@varrock-stray-dog/bot';

@ApplyOptions<EventOptions>({
    event: Events.CommandRun,
})
export class CommandRunEvent extends Event {
    public logger: StrayDogLogger = new StrayDogLogger('Command Run Event');

    run(message, { name }) {
        this.logger.info(
            woofify(`"${name}" by "${message.author.tag}"`, false)
        );
    }
}
