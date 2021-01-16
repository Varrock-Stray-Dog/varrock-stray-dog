import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions } from '@sapphire/framework';
import { woofify, StrayDogCommand } from '@varrock-stray-dog/bot';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    name: 'settings',
    description: 'Get the current settings.',
})
export default class extends StrayDogCommand {
    public async run(message: Message) {
        const settings = await message.guild.settings();
        return message.channel.send(
            woofify(
                `\`\`\`
${JSON.stringify(settings, null, 4)}
\`\`\``
            )
        );
    }
}
