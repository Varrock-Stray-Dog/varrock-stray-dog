import { Structures } from 'discord.js';

export class StrayDogGuild extends Structures.get('Guild') {
    databaseInstance() {
        return this.client.nestjs.send('Guild/findOne', this.id);
    }
}

Structures.extend('Guild', () => StrayDogGuild);
