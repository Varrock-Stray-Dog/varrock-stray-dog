import { Logger, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SettingsService } from './settings.service';
import { SettingsModel } from './settings.model';

@Resolver(() => SettingsModel)
export class SettingsResolver {
    private _logger: Logger = new Logger('Settings Resolver');
    public constructor(private readonly _service: SettingsService) {}

    @Query(() => SettingsModel)
    async guild(@Args('guildId') guildId: string): Promise<SettingsModel> {
        const settings = await this._service.findOneByGuildId(guildId);
        if (!settings) {
            throw new NotFoundException(guildId);
        }
        return settings;
    }
}
