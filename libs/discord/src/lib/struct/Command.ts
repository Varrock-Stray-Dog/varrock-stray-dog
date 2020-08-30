import { Command as AkairoCommand, CommandOptions } from 'discord-akairo';
import { Logger } from '@nestjs/common';

export class Command extends AkairoCommand {
    protected _logger: Logger;

    constructor(id: string, options?: CommandOptions) {
        super(id, options);

        this._logger = new Logger(`Command ${id}`);
    }
}
