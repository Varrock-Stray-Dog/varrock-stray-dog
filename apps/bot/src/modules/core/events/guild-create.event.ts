import { ApplyOptions } from '@sapphire/decorators';
import { Event, EventOptions, Events } from '@sapphire/framework';
import { StrayDogLogger } from 'apps/bot/src';

@ApplyOptions<EventOptions>({
    event: Events.GuildCreate,
})
export class GuildCreateEvent extends Event {
    public logger: StrayDogLogger = new StrayDogLogger('Guild Create Event');

    async run(guild) {
        await this.context.client.nestjs.send(
            'Settings/findOrCreate',
            guild?.id
        );
        this.logger.info(`Joined guild ${guild?.name}.`);
    }
}
