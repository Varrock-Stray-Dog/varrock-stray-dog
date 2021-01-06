import { Controller, Logger } from '@nestjs/common';

import { SettingsService } from './settings.service';
import { MessagePattern } from '@nestjs/microservices';
import { SettingsModel } from './settings.model';

@Controller('settings')
export class SettingsController {
    private _logger: Logger = new Logger('Settings Controller');
    public constructor(private readonly _service: SettingsService) {}

    @MessagePattern({ cmd: 'Guild/getPrefix' })
    async getPrefix(guildId: string): Promise<string> {
        this._logger.log('getPrefix');
        const prefix = await this._service.getPrefix(guildId);
        return prefix ?? process.env.BOT_PREFIX;
    }

    @MessagePattern({ cmd: 'Settings/findOrCreate' })
    async findOrCreate(guildId: string): Promise<SettingsModel> {
        this._logger.log('findOrCreate');
        return this._service.findOrCreate(guildId);
    }

    @MessagePattern({ cmd: 'Settings/findOne' })
    async findOne(guildId: string): Promise<SettingsModel> {
        this._logger.log('findOne');
        return this._service.findOneByGuildId(guildId);
    }

    @MessagePattern({ cmd: 'Settings/findOrCreateMultiple' })
    async findOrCreateMultiple(guildIds: string[]): Promise<SettingsModel[]> {
        this._logger.log('findOrCreateMultiple');

        return Promise.all(
            guildIds.map((guildId) => this._service.findOrCreate(guildId))
        );
    }
}
