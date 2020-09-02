import {
    Injectable,
    Logger,
    OnModuleInit,
    OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient as BasePrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClient extends BasePrismaClient
    implements OnModuleInit, OnModuleDestroy {
    private _logger: Logger = new Logger('Prisma Service');

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
