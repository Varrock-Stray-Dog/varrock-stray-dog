import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Pet } from '@prisma/client';

@ObjectType()
export class PetModel implements Pet {
    @Field(() => ID)
    id: string;

    @Field()
    guildId: string;

    @Field()
    userId: string;

    @Field()
    name: string;

    @Field()
    kc: number;

    @Field()
    date: Date;

    @Field()
    createdAt: Date;

    @Field({ nullable: true })
    updatedAt: Date;
}
