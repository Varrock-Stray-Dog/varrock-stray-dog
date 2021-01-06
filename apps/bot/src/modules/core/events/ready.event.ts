import { PieceContext, Event } from '@sapphire/framework';
import { woofify } from '../../../lib/util';

export class ReadyEvent extends Event {
    constructor(context: PieceContext) {
        super(context, {
            event: 'ready',
        });
    }

    async run() {
        const guildIds = this.context.client.guilds.cache.map(
            (guild) => guild.id
        );
        await this.context.client.nestjs.send(
            'Settings/findOrCreateMultiple',
            guildIds
        );
        this.context.client.logger.info(
            `[Ready] Checked ${guildIds.length} guilds.`
        );

        this.context.client.user.setActivity(`${process.env.BOT_PREFIX} 🐶`, {
            type: 'LISTENING',
        });
        this.context.client.logger.info(
            `[Ready] ${woofify('Stray Dog is ready.', false)}`
        );
    }
}
