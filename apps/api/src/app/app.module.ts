import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { SettingsModule } from './modules/settings/settings.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: process.env.NODE_ENV === 'development',
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),

        // modules
        SettingsModule,
    ],
})
export class AppModule {}
