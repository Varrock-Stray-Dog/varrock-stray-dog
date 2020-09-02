import { Controller, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Guild } from '@prisma/client';

import { GuildService } from './guild.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('guilds')
@ApiTags('guilds')
@ApiBearerAuth()
export class GuildController {
    private _logger: Logger = new Logger('Guild Controller');
    public constructor(private readonly _service: GuildService) {}

    @MessagePattern({ cmd: 'Guild/getPrefix' })
    async getPrefix(guildId: string): Promise<string> {
        this._logger.log('getPrefix');
        const prefix = await this._service.getPrefix(guildId);
        return prefix ?? process.env.BOT_PREFIX;
    }

    @MessagePattern({ cmd: 'Guild/findOrCreate' })
    async findOrCreate(guildId: string): Promise<Guild> {
        this._logger.log('findOrCreate');
        return this._service.findOrCreate(guildId);
    }
}
