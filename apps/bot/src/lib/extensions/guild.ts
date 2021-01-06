import { Structures } from 'discord.js';

export class StrayDogGuild extends Structures.get('Guild') {
    databaseInstance() {
        return this.client.nestjs.send('Settings/findOne', this.id);
    }
}

Structures.extend('Guild', () => StrayDogGuild);
