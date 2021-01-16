import { ApplyOptions } from '@sapphire/decorators';
import { Event, EventOptions } from '@sapphire/framework';
import { StrayDogLogger } from 'apps/bot/src';
import { woofify } from '@varrock-stray-dog/bot';

@ApplyOptions<EventOptions>({
    event: 'ready',
})
export class ReadyEvent extends Event {
    public logger: StrayDogLogger = new StrayDogLogger('Ready Event');

    async run() {
        const guildIds = this.context.client.guilds.cache.map(
            (guild) => guild.id
        );
        await this.context.client.nestjs.send(
            'Settings/findOrCreateMultiple',
            guildIds
        );

        this.context.client.user.setActivity(`${process.env.BOT_PREFIX} 🐶`, {
            type: 'LISTENING',
        });
        this.logger.info(`┬ ${woofify('Stray Dog is ready.', false)}`);
        this.logger.info(`├ Loaded ${this.context.client.events.size} events`);
        this.logger.info(
            `├ Loaded ${this.context.client.arguments.size} arguments`
        );
        this.logger.info(
            `├ Loaded ${this.context.client.preconditions.size} preconditions`
        );
        this.logger.info(
            `├ Loaded ${this.context.client.commands.size} commands`
        );
        this.logger.info(`└ Checked ${guildIds.length} guild settings.`);
    }
}
