import { ResponseCode } from '../constants/response-code';

export interface ResponseData<T = any> {
  code: ResponseCode;
  message: string;
  data?: T;
  timestamp: number;
}

export interface PaginationData<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T = any> extends ResponseData<PaginationData<T>> {} 