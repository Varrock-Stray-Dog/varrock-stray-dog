import { Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { PetModel } from '@varrock-stray-dog/models';
import { PetsService } from './pets.service';

@Resolver(() => PetModel)
export class PetsResolver {
    private _logger: Logger = new Logger('Settings Resolver');
    public constructor(private readonly _service: PetsService) {}
}
