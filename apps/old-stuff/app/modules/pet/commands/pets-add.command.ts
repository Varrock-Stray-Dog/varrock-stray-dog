import {
    Command,
    Message,
    User,
    TextChannel,
} from '@varrock-stray-dog/discord';
import { PetService } from '../pet.service';
import { Injectable } from '@nestjs/common';
import { woofify } from '../../../util/woof';
import { prompt } from '../../../util/prompt';
import { PET } from 'libs/constants/src/lib/pets';

@Injectable()
export class PetsAddCommand extends Command {
    private _messages = {
        pet: {
            initial: woofify("What is the pet's name?"),
            notFound: woofify(
                'I have no information about that pet, Please try again with a different name!'
            ),
            exists: woofify('You already have that pet registered.'),
        },
        kc: {
            initial: (pet: PET) =>
                woofify(
                    `How many kc did it take you to get <:${pet.emoji.join(
                        ':'
                    )}> ${pet.name}?`
                ),
            NaN: () => woofify('Please provide me a valid number!'),
            zero: () =>
                woofify("That's impossible, try a valid number **above 0**!"),
        },
        tooManyAttempts: woofify("I don't think I can help you..."),
        timeout: woofify(
            "I've been sitting here waiting for you!\nUnfortunatly you didn't need me anymore."
        ),
    };

    constructor(private _petService: PetService) {
        super('pets.add', {
            category: 'pets',
            ratelimit: 2,
            description: {
                content: 'Register a pet',
                usage: '',
            },
            args: [
                {
                    id: 'user',
                    type: 'user',
                    unordered: true,
                    default: (message) => message.author,
                },
            ],
            argumentDefaults: {
                prompt: {
                    timeout: woofify(
                        "I've been sitting here waiting for you!\nUnfortunatly you didn't need me anymore."
                    ),
                    ended: woofify("I tried hard, but couldn't help you!"),
                    retries: 4,
                    time: 30000,
                },
            },
        });
    }

    public async exec(message: Message, { user }: { user: User }) {
        const pet = await this._getPet(message, user);
        if (!pet) return;

        const kc = await this._getKc(message, pet);
        if (!kc) return;

        await this._petService.addPet(pet.name, kc, user.id, message.guild.id);
        return message.util.send(
            `:tada: I registered  <:${pet.emoji.join(':')}> ${
                pet.name
            } at kc ${kc}! Congratulations!`
        );
    }

    private async _getPet(
        message: Message,
        user: User,
        type: 'initial' | 'notFound' = 'initial',
        attempt: number = 0
    ): Promise<PET> {
        if (attempt > 5) {
            message.util.send(this._messages.tooManyAttempts);
            return;
        }

        let result = await prompt(
            message.channel as TextChannel,
            message.author,
            this._messages.pet[type]
        );

        if (!result?.size) {
            message.util.send(this._messages.timeout);
            return;
        }

        const pet = this._petService.searchPet(result.first().content);
        if (!pet) {
            return this._getPet(message, user, 'notFound', attempt + 1);
        }

        const exists = await this._petService.hasPet(
            user.id,
            message.guild.id,
            pet.name
        );
        if (exists) {
            message.util.send(this._messages.pet.exists);
            return;
        }

        return pet;
    }

    private async _getKc(
        message: Message,
        pet: PET,
        type: 'initial' | 'NaN' | 'zero' = 'initial',
        attempt: number = 0
    ) {
        if (attempt > 5) {
            message.util.send(this._messages.tooManyAttempts);
            return;
        }

        let result = await prompt(
            message.channel as TextChannel,
            message.author,
            this._messages.kc[type](pet)
        );

        if (!result?.size) {
            message.util.send(this._messages.timeout);
            return;
        }

        const kc = parseInt(result.first().content);

        if (isNaN(kc)) {
            return this._getKc(message, pet, 'NaN', attempt + 1);
        }

        if (kc === 0) {
            return this._getKc(message, pet, 'zero', attempt + 1);
        }

        return kc;
    }
}
