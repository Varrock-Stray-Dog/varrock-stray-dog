import { Args, CommandOptions, PieceContext } from '@sapphire/framework';
import { StrayDogCommand } from 'apps/bot/src/lib';

export abstract class StrayDogPetsCommand<T = Args> extends StrayDogCommand<T> {
    public constructor(context: PieceContext, options: CommandOptions) {
        options.preconditions = Array.isArray(options.preconditions)
            ? ['PetsEnabled', 'GuildOnly', ...options.preconditions]
            : ['PetsEnabled', 'GuildOnly'];
        super(context, options);
    }
}
