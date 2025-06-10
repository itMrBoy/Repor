import { Request, Response } from "express";
import fs from "fs-extra";
import { ResponseCode } from "../constants/response-code";
import { ResponseMessage } from "../constants/response-message";

export class FileController {
  static async getFileContent(req: Request, res: Response) {
    try {
      const { path: filePath } = req.query;

      if (!filePath) {return res.status(ResponseCode.BAD_REQUEST).json({code: ResponseCode.BAD_REQUEST,message: "文件路径不能为空",
        timestamp: Date.now(),});}

      // 检查文件是否存在
      if (!(await fs.pathExists(filePath as string))) {
        return res.status(ResponseCode.NOT_FOUND).json({
          code: ResponseCode.FILE_NOT_EXIST,
          message: ResponseMessage[ResponseCode.FILE_NOT_EXIST],
          timestamp: Date.now(),
        });
      }

      // 检查是否是文件
      const stats = await fs.stat(filePath as string);
      if (!stats.isFile()) {
        return res.status(ResponseCode.BAD_REQUEST).json({
          code: ResponseCode.BAD_REQUEST,
          message: "路径必须是文件",
          timestamp: Date.now(),
        });
      }

      // 读取文件内容
      const content = await fs.readFile(filePath as string, "utf-8");

      res.json({
        code: ResponseCode.SUCCESS,
        message: ResponseMessage[ResponseCode.SUCCESS],
        data: { content },
        timestamp: Date.now(),
      });
    } catch (error: any) {
      console.error("读取文件时发生错误:", error);
      res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
        code: ResponseCode.INTERNAL_SERVER_ERROR,
        message: `服务器错误: ${error.message}`,
        timestamp: Date.now(),
      });
    }
  }
}
