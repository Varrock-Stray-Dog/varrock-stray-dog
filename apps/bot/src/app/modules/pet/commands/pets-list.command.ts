import {
    Command,
    MessageEmbed,
    Message,
    TextChannel,
    User,
} from '@varrock-stray-dog/discord';
import { Embeds } from 'discord-paginationembed';
import { PetService } from '../pet.service';
import { Injectable } from '@nestjs/common';
import { PETS } from 'libs/constants/src/lib/pets';

@Injectable()
export class PetsListCommand extends Command {
    constructor(private _petService: PetService) {
        super('pets.list', {
            category: 'pets',
            ratelimit: 2,
            description: {
                content: 'Show pets list',
                usage: '',
            },
            flags: ['--all'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: (message) => message.author,
                },
                {
                    id: 'all',
                    match: 'flag',
                    flag: ['--all', '-a'],
                },
            ],
        });
    }

    async exec(message: Message, { all, user }: { all: boolean; user: User }) {
        const pets = await this._petService.getByAuthorId(user.id);

        if (!pets.length && !all) {
            if (message.author?.id === user?.id) {
                return message.channel.send(
                    '**Woof!**\nYou have no registered pets yet.'
                );
            }

            return message.channel.send(
                '**Woof!**\nThat user has no registered pets yet.'
            );
        }

        let chunked = [];
        if (all) {
            chunked = PETS.map((pet) => ({
                ...pet,
                kc: pets.find((p) => p.name === pet.name)?.kc || 0,
            }));
        } else {
            chunked = pets.map((pet) => ({
                ...PETS.find((p) => p.name === pet.name),
                kc: pet.kc,
            }));
        }

        chunked = chunked.chunk(12);

        const embeds = [];
        for (let chunk of chunked) {
            const petEmbed = new MessageEmbed().setFooter('');

            for (let pet of chunk) {
                petEmbed.addField(
                    `<:${pet.emoji.join(':')}> ${pet.name}`,
                    pet.kc ? `Obtained at kc ${pet.kc}` : 'Unobtained',
                    true
                );
            }

            embeds.push(petEmbed);
        }

        new Embeds()
            .setArray(embeds)
            .setAuthorizedUsers([user.id])
            .setChannel(message.channel as TextChannel)
            .setAuthor(`${user.username}'s Pets`, user.avatarURL())
            .setPageIndicator('footer')
            .build();
    }
}
