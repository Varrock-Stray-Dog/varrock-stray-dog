import { Structures, Guild } from 'discord.js';

export class StrayDogGuild extends Structures.get('Guild') implements Guild {
    databaseInstance() {
        return this.client.nestjs.send('Guild/findOne', this.id);
    }
}

Structures.extend('Guild', () => StrayDogGuild);
