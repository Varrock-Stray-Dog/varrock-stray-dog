import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { woofify } from '@varrock-stray-dog/bot';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    name: 'ping',
    description: 'Runs a connection test to Discord.',
})
export default class extends Command {
    public async run(message: Message) {
        const sent = await message.channel.send(woofify('Pinging...'));
        const ping = sent.createdTimestamp - message.createdTimestamp;
        return sent.edit(
            woofify(
                `Pong! That took ${ping}ms. Latency: ${this.context.client.ws.ping}ms`
            )
        );
    }
}
