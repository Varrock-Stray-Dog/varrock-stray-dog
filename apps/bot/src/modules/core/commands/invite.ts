import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions } from '@sapphire/framework';
import { woofify, StrayDogCommand } from '@varrock-stray-dog/bot';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    name: 'invite',
    description: 'Sends the invite URL to invite the bot to your server.',
})
export default class extends StrayDogCommand {
    public async run(message: Message) {
        const invite = this.context.client.invite;

        return message.woofSend(`Here you go:\n${invite}`);
    }
}
