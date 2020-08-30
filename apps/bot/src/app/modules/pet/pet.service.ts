import { Injectable } from '@nestjs/common';
import { PETS, PET } from '@varrock-stray-dog/constants';
import { DiscordClient } from '@varrock-stray-dog/discord';
import { PrismaClient } from '../../prisma.client';
import { Pet } from '@prisma/client';

export interface PetWithKC extends PET {
    kc?: number;
}

@Injectable()
export class PetService {
    constructor(private _prisma: PrismaClient) {}

    public getByAuthorId(userId: string): Promise<Pet[]> {
        return this._prisma.pet.findMany({
            where: {
                discord_id: userId,
                kc: {
                    gt: 0,
                },
            },
        });
    }
}
