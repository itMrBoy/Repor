import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../constants/response-code';
import { ResponseMessage } from '../constants/response-message';
import { ResponseData } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseData<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: ResponseCode.SUCCESS,
        message: ResponseMessage[ResponseCode.SUCCESS],
        data,
        timestamp: Date.now(),
      })),
    );
  }
} 