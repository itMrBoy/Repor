import request from './axios';

export interface UploadResponse {
  code: number;
  message: string;
  data?: {
    files: Array<{
      filename: string;
      path: string;
    }>;
  };
}

export const uploadService = {
  upload: (formData: FormData): Promise<UploadResponse> => {
    return request.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 