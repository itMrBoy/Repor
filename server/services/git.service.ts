import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import { buildDirectoryTree } from './buildDirectoryTree.service';

const execAsync = promisify(exec);

export class GitService {
  private readonly cloneDir: string;

  constructor() {
    this.cloneDir = path.join(process.cwd(), '.repor');
  }

  async cloneRepository(url: string) {
    try {
      // 确保克隆目录存在
      await fs.ensureDir(this.cloneDir);
      
      // 清空目录
      await fs.emptyDir(this.cloneDir);

      // 执行 git clone
      const { stdout, stderr } = await execAsync(`git clone ${url}`, {
        cwd: this.cloneDir,
        env: { ...process.env, GIT_SSL_NO_VERIFY: '1' }
      });
      if (stderr && !stderr.includes('Cloning into')) {
        throw new Error(stderr);
      }

      // 构建目录树
      const tree = await buildDirectoryTree(this.cloneDir);

      return {
        success: true,
        message: '克隆成功',
        tree
      };
    } catch (error: any) {
      console.error('Git clone error:', error);
      return {
        success: false,
        message: `克隆失败: ${error.message}`,
        path: null
      };
    }
  }
} 