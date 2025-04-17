import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

@Injectable()
export class GitService {
  private readonly reporDir = path.join(process.cwd(), '.repor');

  async cloneRepository(url: string): Promise<{ success: boolean; message: string }> {
    try {
      // 检查 .repor 目录是否存在
      if (fs.existsSync(this.reporDir)) {
        // 如果存在，先清空目录
        fs.rmSync(this.reporDir, { recursive: true, force: true });
      }
      // 创建新的 .repor 目录
      fs.mkdirSync(this.reporDir);

      // 执行 git clone
      const { stdout, stderr } = await execAsync(`git clone ${url}`, {
        cwd: this.reporDir,
      });

      if (stderr && !stderr.includes('Cloning into')) {
        return {
          success: false,
          message: `克隆失败: ${stderr}`,
        };
      }

      return {
        success: true,
        message: '克隆成功',
      };
    } catch (error: any) {
      return {
        success: false,
        message: `克隆失败: ${error.message}`,
      };
    }
  }
} 