import { Listener, Command } from 'discord-akairo';
import { Logger, Injectable } from '@nestjs/common';
import { Message } from '@varrock-stray-dog/discord';

@Injectable()
export class CommandStartedListener extends Listener {
    private _logger: Logger = new Logger('Command Listener');

    constructor() {
        super('command-started', {
            emitter: 'commandHandler',
            event: 'commandStarted',
        });
    }

    exec(message: Message, command: Command) {
        this._logger.log(
            `Command "${command.id}" initiated by ${message.author.username}:${message.author.discriminator}`
        );
    }
}
