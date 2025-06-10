import request from "./axios";

export interface FileContentResponse {
  code: number;
  message: string;
  data: {
    content: string;
  };
}

export const fileService = {
  getFileContent: async (path: string): Promise<FileContentResponse> => {
    return request("/file/content", {
      method: "GET",
      params: { path },
    });
  },
};
