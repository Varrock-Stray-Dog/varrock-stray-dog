import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Settings } from '@prisma/client';

@ObjectType()
export class PetSettingsModel {
    @Field()
    enabled: boolean;
}

@ObjectType()
export class LootSettingsModel {
    @Field()
    enabled: boolean;

    @Field({ nullable: true })
    moderatorRole?: string;

    @Field()
    requireVerification: boolean;
}

@ObjectType()
export class SettingsModel implements Partial<Settings> {
    @Field(() => ID)
    id: string;

    @Field()
    guildId: string;

    @Field()
    prefix: string;

    @Field()
    language: string;

    @Field(() => PetSettingsModel)
    pets: PetSettingsModel;

    @Field(() => LootSettingsModel)
    loot: LootSettingsModel;

    @Field()
    createdAt: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}
