import { Request, Response } from 'express';
import { GitService } from '../services/git.service';
import { ResponseCode } from '../constants/response-code';

export class GitController {
  private static gitService = new GitService();

  static async cloneRepository(req: Request, res: Response) {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({
          code: ResponseCode.BAD_REQUEST,
          message: 'URL 不能为空',
          timestamp: Date.now()
        });
      }

      const result = await GitController.gitService.cloneRepository(url);
      
      res.json({
        code: result.success ? ResponseCode.SUCCESS : ResponseCode.SYSTEM_ERROR,
        message: result.message,
        timestamp: Date.now()
      });
    } catch (error: any) {
      res.status(500).json({
        code: ResponseCode.SYSTEM_ERROR,
        message: `服务器错误: ${error.message}`,
        timestamp: Date.now()
      });
    }
  }
} 