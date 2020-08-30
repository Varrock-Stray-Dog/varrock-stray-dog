import { Module } from '@nestjs/common';
import { DiscordModule } from '@varrock-stray-dog/discord';

import { PetService } from './pet.service';

import { Commands } from './commands';
import { PrismaClient } from '../../prisma.client';

@Module({
    imports: [
        DiscordModule.forFeature({
            commands: Commands,
            inject: [PetService, PrismaClient],
        }),
    ],
    controllers: [],
    providers: [PetService, PrismaClient],
})
export class PetModule {}
