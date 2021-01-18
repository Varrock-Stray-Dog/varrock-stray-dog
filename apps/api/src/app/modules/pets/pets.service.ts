import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../prisma/prisma.client';
import { PETS, IPetMetaData } from '@varrock-stray-dog/constants';
import Fuse from 'fuse.js';
import { Pet } from '@prisma/client';

@Injectable()
export class PetsService {
    private _fuse: Fuse<IPetMetaData> = new Fuse(PETS, {
        keys: ['aliases', 'name'],
        includeScore: true,
    });

    constructor(private _prisma: PrismaClient) {}

    search(name: string): IPetMetaData {
        const results = this._fuse.search(name);
        return (results?.[0]?.item as IPetMetaData) ?? null;
    }

    async findOneByUserAndName(userId: string, name: string): Promise<Pet> {
        const result = await this._prisma.pet.findMany({
            where: {
                userId,
                name,
            },
            take: 1,
        });

        return result?.[0];
    }

    add(pet: Pet): Promise<Pet> {
        return this._prisma.pet.create({
            data: pet,
        });
    }
}
