import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Args } from '@sapphire/framework';
import { Message } from 'discord.js';
import { StrayDogPetsCommand } from '../struct/stray-dog-pets-command';
import { IPetMetaData } from '@varrock-stray-dog/constants';
import { PetModel } from '@varrock-stray-dog/models';
import {
    parseISO,
    isValid,
    getYear,
    getMonth,
    getDate,
    format,
} from 'date-fns';

@ApplyOptions<CommandOptions>({
    name: 'pet-add',
    description: 'Add a pet to your collection',
    strategyOptions: {
        options: ['kills', 'kc', 'k', 'date', 'd', 'screenshot', 'ss'],
    },
})
export default class extends StrayDogPetsCommand {
    public async run(message: Message, args: Args) {
        const name = await args.restResult('string');

        if (!name.success) {
            return message.channel.woofSend(
                'You must supply the name of the pet.'
            );
        }

        const petMetaData: IPetMetaData = await this.context.client.nestjs.send(
            'Pet/search',
            name.value
        );

        if (!petMetaData) {
            return message.channel.woofSend(
                `Sorry, I could not find a pet with the search query "${name.value}"`
            );
        }

        const emoji = this.context.client.emojis.cache.get(
            petMetaData?.emoji[1]
        );

        const hasPet: PetModel = await this.context.client.nestjs.send(
            'Pet/findOneByUserAndName',
            { userId: message.author.id, name: petMetaData?.name }
        );

        if (hasPet) {
            return message.channel.woofSend(
                `You already have ${emoji} ${hasPet.name} registered at ${
                    hasPet.kc
                }kc on ${format(parseISO(hasPet.date as any), 'LLL. co, yyyy')}`
            );
        }

        let kc = parseInt(args.getOption('kills', 'kc', 'k'));
        if (!kc) {
            const prompt = await message.prompt(
                `At what kc did you receive ${emoji} ${petMetaData.name}?`,
                'message'
            );

            kc = parseInt(prompt.content);
        }

        if (isNaN(kc)) {
            return message.channel.woofSend(`Kc must be a number`);
        }

        let date = args.getOption('date', 'd');
        if (!date) {
            const prompt = await message.prompt(
                `What was the date that you received ${emoji} ${petMetaData.name}?`,
                'message'
            );

            date = prompt.content;
        }

        const parsedDate = parseISO(
            date
                .split('-')
                .map((v) => (v?.length === 1 ? `0${v}` : v))
                .join('-')
        );
        if (!isValid(parsedDate)) {
            return message.channel.woofSend(
                `That's not a valid date, try something along the lines of \`year-month-day\`.\nex: ${getYear(
                    new Date()
                )}-${getMonth(new Date()) + 1}-${getDate(new Date())}`
            );
        }

        const createObj = {
            userId: message.author.id,
            guildId: message.guild.id,
            kc,
            date: parsedDate,
            name: petMetaData.name,
        };

        const pet: PetModel = await this.context.client.nestjs.send(
            'Pet/add',
            createObj
        );

        return message.channel.send(
            `\`\`\`${JSON.stringify(pet, null, 4)}\`\`\``
        );
    }
}