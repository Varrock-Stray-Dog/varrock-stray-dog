import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Pet } from '@prisma/client';
import { IPetMetaData } from '@varrock-stray-dog/constants';

import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
    private _logger: Logger = new Logger('Pets Controller');
    public constructor(private readonly _service: PetsService) {}

    @MessagePattern({ cmd: 'Pet/search' })
    getPrefix(name: string): IPetMetaData {
        this._logger.log('search');
        return this._service.search(name);
    }

    @MessagePattern({ cmd: 'Pet/findByName' })
    findByName({
        userId,
        guildId,
        name,
    }: {
        userId: string;
        guildId: string;
        name: string;
    }): Promise<Pet> {
        this._logger.log('findByName');
        return this._service.findByName(userId, guildId, name);
    }

    @MessagePattern({ cmd: 'Pet/findMany' })
    findMany({ userId, guildId }): Promise<Pet[]> {
        this._logger.log('findMany');
        return this._service.findMany(userId, guildId);
    }

    @MessagePattern({ cmd: 'Pet/add' })
    add(pet: Pet): Promise<Pet> {
        this._logger.log('add');
        return this._service.add(pet);
    }

    @MessagePattern({ cmd: 'Pet/delete' })
    delete(id: string): Promise<Pet> {
        this._logger.log('delete');
        return this._service.delete(id);
    }

    @MessagePattern({ cmd: 'Pet/top' })
    top(guildId: string): Promise<any> {
        this._logger.log('delete');
        return this._service.top(guildId);
    }
}
