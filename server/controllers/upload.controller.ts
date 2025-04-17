import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { ResponseCode } from '../constants/response-code';
import { ResponseMessage } from '../constants/response-message';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), '.repor');
    // 确保上传目录存在
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export class UploadController {
  static async uploadFolder(req: Request, res: Response) {
    try {
      const reporDir = path.join(process.cwd(), '.repor');
      
      // 检查 .repor 目录是否存在
      if (await fs.pathExists(reporDir)) {
        // 如果存在，清空目录
        await fs.emptyDir(reporDir);
      } else {
        // 如果不存在，创建目录
        await fs.ensureDir(reporDir);
      }

      // 使用 multer 处理文件上传
      upload.array('files')(req, res, (err) => {
        if (err) {
          console.error('上传错误:', err);
          return res.status(ResponseCode.FILE_UPLOAD_FAILED).json({
            code: ResponseCode.FILE_UPLOAD_FAILED,
            message: ResponseMessage[ResponseCode.FILE_UPLOAD_FAILED],
            error: err.message
          });
        }

        res.status(ResponseCode.SUCCESS).json({
          code: ResponseCode.SUCCESS,
          message: ResponseMessage[ResponseCode.SUCCESS],
          data: {
            files: (req.files as Express.Multer.File[]).map(file => ({
              filename: file.filename,
              path: file.path
            }))
          }
        });
      });
    } catch (error) {
      console.error('处理上传时发生错误:', error);
      res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
        code: ResponseCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessage[ResponseCode.INTERNAL_SERVER_ERROR],
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  }
} 