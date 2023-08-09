import { Module } from '@nestjs/common';
import { Log4jsLogger } from './loggerLog4js/loggerLog4js.service';

@Module({
  imports: [],
  providers: [],
  exports: [Log4jsLogger],
})
export class LoggerModule {}
