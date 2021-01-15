import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, Args } from '@sapphire/framework';
import { woofify } from '@varrock-stray-dog/bot';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    name: 'prompt',
    description: 'Sends the message as a prompt',
})
export default class extends Command {
    public async run(message: Message, args: Args) {
        const msg = await args.pickResult('string');
        if (!msg.success) {
            return message.reply(woofify('I require a message to send.'));
        }

        const confirmed = await message.replyPrompt(msg?.value);

        return message.channel.send(
            woofify(
                confirmed
                    ? 'You pressed confirm!'
                    : 'You pressed cancel or there was a timeout!'
            )
        );
    }
}
