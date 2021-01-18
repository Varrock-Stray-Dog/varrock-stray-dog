import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Args } from '@sapphire/framework';
import { woofify, StrayDogCommand } from '@varrock-stray-dog/bot';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    name: 'prompt',
    description: 'Sends the message as a prompt',
})
export default class extends StrayDogCommand {
    public async run(message: Message, args: Args) {
        const typeArg = await args.pickResult('string');
        const type = typeArg?.success ? typeArg.value : 'confirm';

        switch (type) {
            case 'confirm':
                return this.runConfirm(message);
            case 'number':
                return this.runNumber(message);
            case 'reaction':
                return this.runReaction(message);
            case 'message':
                return this.runMessage(message);
        }
    }

    private async runConfirm(message: Message) {
        const confirmed = await message.prompt('Are you sure?');

        return message.channel.send(
            woofify(
                confirmed
                    ? 'You pressed confirm!'
                    : 'You pressed cancel or there was a timeout!'
            )
        );
    }

    private async runNumber(message: Message) {
        const number = await message.prompt('Choose a number?', 'number');
        return message.channel.send(woofify(`I received the number ${number}`));
    }

    private async runReaction(message: Message) {
        const reaction = await message.prompt('Are you happy or sad?', {
            type: 'reaction',
            reactions: ['🙂', '🙁'],
        });

        return message.channel.send(
            woofify(
                reaction === '🙂'
                    ? `Good! I am happy too!`
                    : `That's sad to hear, do you need a listening ear?`
            )
        );
    }

    private async runMessage(message: Message) {
        const reaction = (await message.prompt(
            'Am I a good doggy?',
            'message'
        )) as Message;

        return message.channel.send(
            woofify(`I received:\n\`\`\`\n${reaction?.content}\n\`\`\``)
        );
    }
}
