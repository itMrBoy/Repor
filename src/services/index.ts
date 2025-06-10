import request from "./axios";

export interface Response {
  code: number;
  message: string;
  timestamp: number;
  data?: any;
}

export interface AnalyzeResponse {
  code: number;
  message: string;
  data?: {
    tree: DirectoryNode;
  };
}

export interface DirectoryNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: DirectoryNode[];
}

export const fileListService = async (path: string): Promise<Response> => {
  return request("/git/projects", {
    method: "GET",
    params: { path },
  });
};

export const gitService = {
  clone: (url: string): Promise<Response> => {
    return request.post("/git/clone", { url });
  },
};

export const analyzeService = {
  analyze: (path: string): Promise<AnalyzeResponse> => {
    return request.post("/analyze", { path });
  },
};
