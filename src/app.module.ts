import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().default(80).optional(),
        DATABASE_HOST: Joi.string(),
        DATABASE_PORT: Joi.string(),
        DATABASE_USERNAME: Joi.string(),
        DATABASE_PASSWORD: Joi.string(),
        DATABASE_NAME: Joi.string(),
        DATABASE_SCHEMA: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ModulesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
