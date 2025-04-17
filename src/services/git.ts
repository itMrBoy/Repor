import request from './axios';

export interface GitResponse {
  code: number;
  message: string;
  timestamp: number;
  data?: any;
}

export const gitService = {
  clone: (url: string): Promise<GitResponse> => {
    return request.post('/git/clone', { url });
  },
}; 