import { Logger as NestLogger } from '@nestjs/common';
import { ILogger } from '@sapphire/framework';

export class StrayDogLogger implements ILogger {
    private _logger: NestLogger;
    constructor(name: string) {
        this._logger = new NestLogger(name);
    }

    public info(message: string, ctx?: any) {
        return this._logger.log(message, ctx);
    }

    public warn(message: string, ctx?: any) {
        return this._logger.warn(message, ctx);
    }

    public trace(...args: any) {
        return this._logger.error.apply(this._logger, args);
    }

    public fatal(...args: any) {
        return this._logger.error.apply(this._logger, args);
    }

    public error(message: string, trace?: any, ctx?: any) {
        return this._logger.error(message, trace, ctx);
    }

    public write(...args: any) {
        // return this._logger.log(this._logger, args);
        // TODO: figure out if nest logger has write
        return;
    }

    public debug(message: string, ctx?: any) {
        return this._logger.debug(message, ctx);
    }
}
