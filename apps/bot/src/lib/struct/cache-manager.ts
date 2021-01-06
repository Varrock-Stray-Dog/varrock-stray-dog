import { StrayDogClient } from '../client';
import { OPTIONAL_DEFAULT } from '../constants';
import { CacheKey } from '../types/enums';

/*
 * @copyright Aditya N. Tripathi https://github.com/AdityaTD
 * @license Apache-2.0
 */
export class CacheManager {
    private readonly client: StrayDogClient;
    public static readonly SEPERATOR = '_';

    public constructor(client: StrayDogClient) {
        this.client = client;
    }

    public set(key: string, value: string, type: CacheKey) {
        return this.client.redis.set(
            `${type}${CacheManager.SEPERATOR}${key}`,
            value
        );
    }

    public get(key: string, type: CacheKey) {
        return this.client.redis.get(`${type}${CacheManager.SEPERATOR}${key}`);
    }

    public async has(key: string, type: CacheKey) {
        const value = await this.get(key, type);
        return value !== null;
    }

    public async getGuildPrefix(id: string) {
        const prefix = await this.get(id, CacheKey.GuildPrefix);
        if (prefix !== null) return prefix;

        const guild = await this.client.nestjs.send('Guild/findOrCreate', id);

        await this.set(id, guild.prefix, CacheKey.GuildPrefix);

        return [guild.prefix, OPTIONAL_DEFAULT];
    }

    public async getLanguage(id: string) {
        const lang = await this.get(id, CacheKey.GuildLanguage);
        if (lang !== null && lang.length) return lang;

        const guild = await this.client.nestjs.send('Guild/findOrCreate', id);

        await this.set(id, guild.language, CacheKey.GuildLanguage);

        return guild.language || 'en-US';
    }
}
