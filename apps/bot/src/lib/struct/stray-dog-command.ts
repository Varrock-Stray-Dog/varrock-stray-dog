import {
    Args,
    Command,
    CommandOptions,
    PieceContext,
} from '@sapphire/framework';

export abstract class StrayDogCommand<T = Args> extends Command<T> {
    public constructor(context: PieceContext, options: CommandOptions) {
        // @ts-ignore i cbb typing this
        options.preconditions = Array.isArray(options.preconditions)
            ? ['ApiOnline', ...options.preconditions]
            : ['ApiOnline'];
        super(context, options);
    }
}
