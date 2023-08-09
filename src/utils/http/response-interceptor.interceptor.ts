import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getResponseMessageByCode, getBooleanByCode } from '../constants';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = (data) => {
      const statusCode = context.switchToHttp().getResponse().statusCode;
      return {
        statusCode: statusCode,
        message: getResponseMessageByCode(statusCode),
        success: getBooleanByCode(statusCode),
        data: data,
      };
    };
    return next.handle().pipe(map(response));
  }
}
