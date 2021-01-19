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

    async findByName(
        userId: string,
        guildId: string,
        name: string
    ): Promise<Pet> {
        const result = await this._prisma.pet.findMany({
            where: {
                userId,
                guildId,
                name,
            },
            take: 1,
        });

        return result?.[0];
    }

    findMany(userId: string, guildId: string): Promise<Pet[]> {
        return this._prisma.pet.findMany({
            where: {
                userId,
                guildId,
            },
        });
    }

    add(pet: Pet): Promise<Pet> {
        return this._prisma.pet.create({
            data: pet,
        });
    }

    delete(id: string): Promise<Pet> {
        return this._prisma.pet.delete({
            where: {
                id,
            },
        });
    }

    async top(guildId: string): Promise<any> {
        // TODO: Fix this as any shit
        const top = await (this._prisma.pet.groupBy as any)({
            by: ['userId'],
            where: {
                guildId,
            },
            count: {
                _all: true,
            },
        });

        return top.sort((a, b) => b.count._all - a.count._all);
    }
}
