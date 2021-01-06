import { PieceContext, Event, Events } from '@sapphire/framework';

export class GuildCreateEvent extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: Events.GuildCreate,
        });
    }

    async run(guild) {
        await this.context.client.nestjs.send(
            'Settings/findOrCreate',
            guild?.id
        );
        this.context.client.logger.info(
            `[Guild Create] Joined guild ${guild?.name}.`
        );
    }
}
