import { AkairoOptions, PrefixSupplier } from 'discord-akairo';

export interface DiscordConfig extends AkairoOptions {
    defaultPrefix: string | PrefixSupplier;
    shardId: string;
    token: string;
}

export interface DiscordFeatureConfig {
    commands?: any[];
    listeners?: any[];
    inhibitors?: any[];
    inject?: any[];
}
