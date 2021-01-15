import { Settings } from '@prisma/client';
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
        if (prefix !== null) {
            return [prefix, OPTIONAL_DEFAULT];
        }

        const {
            prefix: settingsPrefix,
        }: Settings = await this.client.nestjs.send('Settings/findOne', id);

        await this.set(id, settingsPrefix, CacheKey.GuildPrefix);
        return [settingsPrefix, OPTIONAL_DEFAULT];
    }

    public async getLanguage(id: string) {
        const lang = await this.get(id, CacheKey.GuildLanguage);
        if (lang !== null && lang.length) {
            return lang;
        }

        const { language }: Settings = await this.client.nestjs.send(
            'Settings/findOne',
            id
        );

        await this.set(id, language, CacheKey.GuildLanguage);

        return language || 'en-US';
    }
}
