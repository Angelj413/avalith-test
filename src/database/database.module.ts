import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<typeof configuration>) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          ...dbConfig,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
