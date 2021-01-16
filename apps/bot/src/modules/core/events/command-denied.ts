import { ApplyOptions } from '@sapphire/decorators';
import {
    Event,
    Events,
    EventOptions,
    CommandDeniedPayload,
} from '@sapphire/framework';
import { StrayDogLogger } from 'apps/bot/src';
import { woofify } from '@varrock-stray-dog/bot';

@ApplyOptions<EventOptions>({
    event: Events.CommandDenied,
})
export class CommandDeniedEvent extends Event {
    public logger: StrayDogLogger = new StrayDogLogger('Command Denied Event');

    run(error: any, { message, command: { name } }: CommandDeniedPayload) {
        if (error?.identifier === 'ApiOnline') {
            this.logger.error('Api is offline.');
            if (error?.extras?.message?.length) {
                message.channel.send(error?.extras?.message);
            }
            return;
        }

        if (typeof error === 'string') {
            return message.channel.send(error);
        }

        this.logger.info(
            woofify(`"${name}" by "${message.author.tag}"`, false)
        );
    }
}
