import { SettingsModel } from '@varrock-stray-dog/models';
import { Structures } from 'discord.js';

export class StrayDogGuild extends Structures.get('Guild') {
    settings(): Promise<SettingsModel> {
        return this.client.nestjs.send('Settings/findOne', this.id);
    }
}

Structures.extend('Guild', () => StrayDogGuild);
