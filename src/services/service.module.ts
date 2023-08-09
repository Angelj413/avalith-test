import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/services/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [LoggerModule],
  exports: [LoggerModule],
})
export class ServicesModule {}
