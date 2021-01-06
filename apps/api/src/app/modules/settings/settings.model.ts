import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Settings } from '@prisma/client';

@ObjectType()
export class SettingsModel implements Settings {
    @Field((type) => ID)
    id: string;

    @Field((type) => String)
    guildId: string;

    @Field((type) => String)
    prefix: string;
}
