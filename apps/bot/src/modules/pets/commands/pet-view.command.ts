import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Args } from '@sapphire/framework';
import { Message } from 'discord.js';
import { StrayDogPetsCommand } from '../struct/stray-dog-pets-command';
import { PETS } from '@varrock-stray-dog/constants';
import { PetModel } from '@varrock-stray-dog/models';
import { MessageEmbed } from 'discord.js';
import { woofify } from 'apps/bot/src/lib';
import { format, parseISO } from 'date-fns';

@ApplyOptions<CommandOptions>({
    name: 'pet-view',
    description: 'View your collection of pets',
    strategyOptions: {
        flags: ['unobtained', 'u'],
    },
})
export default class extends StrayDogPetsCommand {
    public async run(message: Message, args: Args) {
        const member = await args.pick('member').catch(() => message.member);

        const pets: PetModel[] = await this.context.client.nestjs.send(
            'Pet/findMany',
            {
                userId: member.user?.id,
                guildId: message.guild.id,
            }
        );

        const wantsUnobtained = args.getFlags('unobtained', 'u');
        if (!pets?.length && !wantsUnobtained) {
            return message.channel.woofSend(
                'I am sorry, I could not find any pets.'
            );
        }

        const obtainedPets = pets.map((pet) => ({
            ...pet,
            meta: PETS.find((p) => p.name === pet.name),
        }));

        const embed = new MessageEmbed()
            .setAuthor(
                `${member.nickname || member.user?.username}'s pet's`,
                member?.user?.avatarURL()
            )
            .setDescription(
                `${
                    member.nickname || member.user?.username
                } has obtained a total of ${obtainedPets?.length}/${
                    PETS.length
                } pets.`
            );

        if (obtainedPets.length) {
            embed.addField('\u200b', '**Obtained:**');

            while (obtainedPets.length % 3 !== 0) {
                obtainedPets.push(null);
            }

            for (const obtained of obtainedPets) {
                const emoji = this.context.client.emojis.cache.get(
                    obtained?.meta.emoji[1]
                );

                if (!obtained) {
                    embed.addField('\u200b', '\u200b', true);
                    continue;
                }

                embed.addField(
                    `${emoji} ${obtained.meta.name}`,
                    `Obtained on ${format(
                        parseISO(obtained?.date as any),
                        'LLL. co, yyyy'
                    )} at ${obtained?.kc}${
                        obtained?.meta?.category === 'skilling' ? 'xp' : 'kc'
                    }`,
                    true
                );
            }
        }

        if (wantsUnobtained) {
            const unobtained = PETS.filter(
                (p) => pets.findIndex((pet) => pet.name === p.name) === -1
            );

            if (unobtained?.length) {
                const chunked = unobtained.chunk(16);

                while (chunked.length % 3 !== 0) {
                    chunked.push([]);
                }

                for (let i = 0; i < chunked.length; i++) {
                    const chunk = chunked[i];

                    if (!chunk.length) {
                        embed.addField('\u200b', '\u200b', true);
                        continue;
                    }

                    embed.addField(
                        i === 0 ? 'Unobtained' : '\u200b',
                        chunk
                            .map((pet) => {
                                const emoji = this.context.client.emojis.cache.get(
                                    pet?.emoji[1]
                                );
                                return `${emoji} ${pet.name}`;
                            })
                            .join('\n'),
                        true
                    );
                }
            }
        }

        return message.channel
            .send({
                content: woofify('', false),
                embed,
            })
            .catch((err) => console.log(err));
    }
}
