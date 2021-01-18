import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Pet } from '@prisma/client';
import { IPetMetaData } from 'libs/constants/src/lib/pets';

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

    @MessagePattern({ cmd: 'Pet/findOneByUserAndName' })
    findOneByUserAndName({
        userId,
        name,
    }: {
        userId: string;
        name: string;
    }): Promise<Pet> {
        this._logger.log('findOneByUserAndName');
        return this._service.findOneByUserAndName(userId, name);
    }

    @MessagePattern({ cmd: 'Pet/add' })
    add(pet: Pet): Promise<Pet> {
        this._logger.log('add');
        return this._service.add(pet);
    }
}
