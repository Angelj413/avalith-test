import { Injectable } from '@nestjs/common';
import { configure, Logger } from 'log4js';
import * as morgan from 'morgan';

export interface ILogLine {
  time: string;
  level: string;
  message: string;
}

@Injectable()
export class Log4jsLogger {
  public defaultLogger: Logger;
  public expressLogger: Logger;

  constructor() {
    const logConfig = configure({
      appenders: {
        console: { type: 'console' },
      },
      categories: {
        default: { appenders: ['console'], level: 'debug' },
        express: { appenders: ['console'], level: 'debug' },
      },
    });
    this.defaultLogger = logConfig.getLogger('default');
    this.expressLogger = logConfig.getLogger('express');
  }

  public getExpressLogger = () => {
    return morgan(
      ':method :url HTTP/:http-version | :status | :response-time ms | :res[content-length] | :remote-addr | :remote-user',
      {
        stream: {
          write: this.logStream,
        },
      },
    );
  };

  public logStream = (message: string) => {
    const statusCode = Number(message.split(' | ')[1]);
    if (statusCode < 400) {
      this.expressLogger.info(message.trim());
    } else {
      this.expressLogger.error(message.trim());
    }
  };
}
