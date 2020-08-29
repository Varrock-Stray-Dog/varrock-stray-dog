import {
    DISCORD_CLIENT_COMMANDS_TOKEN,
    DISCORD_CLIENT_INHIBITORS_TOKEN,
    DISCORD_CLIENT_LISTENERS_TOKEN,
} from '../discord.constants';

export const createThingProviders = (
    TOKEN: string,
    things: any[],
    inject: any[]
) => {
    things = things?.length ? things : [];

    return [
        ...things.map((thing: any) => ({
            provide: thing,
            useClass: thing,
            inject: inject ?? [],
        })),
        {
            provide: TOKEN,
            useFactory: (...args) => args,
            inject: things,
        },
    ];
};

export const createInjectProviders = (inject: any[]) =>
    inject?.length ? inject : [];

export const createCommandProviders = (commands: any[], inject: any[]) =>
    createThingProviders(DISCORD_CLIENT_COMMANDS_TOKEN, commands, inject);
export const createInhibitorProviders = (inhibitors: any[], inject: any[]) =>
    createThingProviders(DISCORD_CLIENT_INHIBITORS_TOKEN, inhibitors, inject);
export const createListenerProviders = (listeners: any[], inject: any[]) =>
    createThingProviders(DISCORD_CLIENT_LISTENERS_TOKEN, listeners, inject);
