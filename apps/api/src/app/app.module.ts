import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';

import { SettingsModule } from './modules/settings/settings.module';
import { PetsModule } from './modules/pets/pets.module';

@Module({
    imports: [
        HttpModule,
        GraphQLModule.forRoot({
            debug: process.env.NODE_ENV === 'development',
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),

        // modules
        SettingsModule,
        PetsModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
