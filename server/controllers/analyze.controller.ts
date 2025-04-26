import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';
import { ResponseCode } from '../constants/response-code';
import { ResponseMessage } from '../constants/response-message';
import { buildDirectoryTree } from '../services/buildDirectoryTree.service';

export class AnalyzeController {
  static async appendFileFunc(dirPath: string) {
    // 判断.report目录下是否存在一个report.json文件
    // 如果.report目录不存在则创建，将本次path写入
    // 如果.report目录存在，则将本次path写入report.json
    // 将本次path写入report.json
    const reportPath = path.join(process.cwd(), '.repor', 'repor.txt');
    // 如果reportPath不存在，则创建
    if (!await fs.pathExists(reportPath)) {
      await fs.createFile(reportPath);
    }
    // 判断reportPath里面是否包含dirPath，不包含则追加写入
    const content = await fs.readFile(reportPath, 'utf-8');
    if (!content.includes(dirPath)) {
      await fs.appendFile(reportPath, `${dirPath} ${new Date().toISOString()}\n`);
    }
    console.log('reportPath', reportPath);
  }

  static async analyze(req: Request, res: Response) {
    try {
      const { path: dirPath } = req.body;

      if (!dirPath) {
        return res.status(ResponseCode.BAD_REQUEST).json({
          code: ResponseCode.BAD_REQUEST,
          message: '路径不能为空',
          timestamp: Date.now()
        });
      }

      // 检查路径是否存在
      if (!await fs.pathExists(dirPath)) {
        return res.status(ResponseCode.NOT_FOUND).json({
          code: ResponseCode.NOT_FOUND,
          message: '路径不存在',
          timestamp: Date.now()
        });
      }
      
      this.appendFileFunc(dirPath);

      // 检查是否是目录
      const stats = await fs.stat(dirPath);
      if (!stats.isDirectory()) {
        return res.status(ResponseCode.BAD_REQUEST).json({
          code: ResponseCode.BAD_REQUEST,
          message: '路径必须是目录',
          timestamp: Date.now()
        });
      }

      // 构建目录树
      const tree = await buildDirectoryTree(dirPath);

      res.json({
        code: ResponseCode.SUCCESS,
        message: ResponseMessage[ResponseCode.SUCCESS],
        data: { tree },
        timestamp: Date.now()
      });
    } catch (error: any) {
      console.error('分析目录时发生错误:', error);
      res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
        code: ResponseCode.INTERNAL_SERVER_ERROR,
        message: `服务器错误: ${error.message}`,
        timestamp: Date.now()
      });
    }
  }
} 