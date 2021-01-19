import { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Args } from '@sapphire/framework';
import { StrayDogPetsCommand } from '../struct/stray-dog-pets-command';
import { createLeaderBoardEmbed } from 'apps/bot/src/lib';
import { PETS } from 'libs/constants/src/lib/pets';

@ApplyOptions<CommandOptions>({
    name: 'pet-top',
    description: 'View the pets leaderboard for this guild.',
})
export default class extends StrayDogPetsCommand {
    async run(message: Message, args: Args) {
        const chunkSize = await args.pick('number').catch(() => 10);

        const top = await this.context.client.nestjs.send(
            'Pet/top',
            message.guild.id
        );

        if (!top.length) {
            return message.channel.woofSend(
                `There are no recoreded pet's yet in this guild.`
            );
        }

        const handler = createLeaderBoardEmbed(
            `:trophy: ${message.guild.name} top pet collectors`,
            message.channel,
            top.map((t) => ({
                userId: t.userId,
                value: `    ${t.count._all} pets | ${t.count._all}/${
                    PETS.length
                } | ${Math.round((t.count._all / PETS.length) * 100)}%`,
            })),
            chunkSize
        );

        // Why can't I use DMChannel??
        return handler.run(message.author, message.channel as any);
    }
}
