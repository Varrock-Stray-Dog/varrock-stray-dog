import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Args } from '@sapphire/framework';
import { Message } from 'discord.js';
import { StrayDogPetsCommand } from '../struct/stray-dog-pets-command';
import { IPetMetaData } from '@varrock-stray-dog/constants';
import { PetModel } from '@varrock-stray-dog/models';
import { parseISO, format } from 'date-fns';
import { canEditPet } from '../util/can-edit-pet';
import { woofify } from 'apps/bot/src/lib';

@ApplyOptions<CommandOptions>({
    name: 'pet-remove',
    description: 'Remove a pet from your collection',
    strategyOptions: {
        flags: ['confirm', 'c'],
    },
})
export default class extends StrayDogPetsCommand {
    public async run(message: Message, args: Args) {
        const { user, isSomeoneElse } = await canEditPet(message, args);
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

        const pet: PetModel = await this.context.client.nestjs.send(
            'Pet/findByName',
            {
                userId: user.id,
                guildId: message.guild.id,
                name: petMetaData?.name,
            }
        );

        if (!pet) {
            return message.channel.woofSend(
                `${
                    isSomeoneElse ? 'He/She does' : 'You do'
                } not have ${emoji} ${petMetaData.name} registered.`
            );
        }

        if (!args.getFlags('confirm', 'c')) {
            const prompt = (await message.prompt(
                woofify(
                    `Are you sure you want to remove ${emoji} ${
                        pet.name
                    } from ${
                        isSomeoneElse ? `<@${user?.id}>'s` : 'your'
                    } collection?`
                )
            )) as Message;

            if (!prompt) {
                return message.channel.send(`Cancelled your request.`);
            }
        }

        await this.context.client.nestjs.send('Pet/delete', pet.id);

        return message.channel.woofSend(
            `I have removed ${emoji} ${pet.name} from your collection.`
        );
    }
}
