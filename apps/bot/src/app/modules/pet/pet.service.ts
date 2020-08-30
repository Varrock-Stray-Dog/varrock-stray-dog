import { Injectable } from '@nestjs/common';
import { PETS, PET } from '@varrock-stray-dog/constants';
import { PrismaClient } from '../../prisma.client';
import { Pet } from '@prisma/client';
import Fuse from 'fuse.js';

export interface PetWithKC extends PET {
    kc?: number;
}

@Injectable()
export class PetService {
    private _pets: Fuse<PET>;

    constructor(private _prisma: PrismaClient) {
        this._pets = new Fuse(PETS, {
            keys: ['name', 'aliases'],
        });
    }

    public getByAuthorAndGuildId(
        userId: string,
        guildId: string
    ): Promise<Pet[]> {
        return this._prisma.pet.findMany({
            where: {
                user_id: userId,
                guild_id: guildId,
                kc: {
                    gt: 0,
                },
            },
        });
    }

    public searchPet(name: string) {
        const results = this._pets.search(name);
        return results[0]?.item;
    }

    public hasPet(userId: string, guildId: string, name: string) {
        return this._prisma.pet.count({
            where: {
                user_id: userId,
                guild_id: guildId,
                name: name,
            },
        });
    }

    public addPet(name: string, kc: number, userId: string, guildId: string) {
        return this._prisma.pet.create({
            data: {
                name,
                kc,
                user_id: userId,
                guild_id: guildId,
            },
        });
    }
}
