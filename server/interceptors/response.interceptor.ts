import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCode } from '../constants/response-code';
import { ResponseMessage } from '../constants/response-message';
import { ResponseData } from '../interfaces/response.interface';

export class ResponseInterceptor<T>
{
  intercept(
    context: any,
    next: any,
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