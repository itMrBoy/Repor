import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import { buildDirectoryTree } from './buildDirectoryTree.service';
import { message } from 'antd';
import { flatten } from 'lodash-es';

const execAsync = promisify(exec);

export class GitService {
  private readonly cloneDir: string;

  constructor() {
    this.cloneDir = path.join(process.cwd(), '.repor');
  }

  async readReportFile() {
    const reportPath = path.join(this.cloneDir, 'repor.txt');
    if (!await fs.pathExists(reportPath)) {
      return [];
    }
    const reportContent = await fs.readFile(reportPath, 'utf-8');
    const reportLines = reportContent.split('\n');
    const reportProjects = reportLines.map(line => {
      if (!line || !line.trim()) return null;
      const [path, lastModified] = line.split(' '); 
      return {
        // 分割path的最后一个，且不能改变path
        name: path.split('\\').pop(),
        path: path,
        lastModified: lastModified
      };
    });
    return reportProjects;
  }

  async getClonedProjects() {
    try {
      // 确保克隆目录存在
      await fs.ensureDir(this.cloneDir);
      
      // 读取目录内容
      const items = await fs.readdir(this.cloneDir);
      
      // 过滤出目录
      const promiseQueue = items.map(async (item) => {
        const itemPath = path.join(this.cloneDir, item);
        const stats = await fs.stat(itemPath);
        if (stats.isDirectory()) {
          return {
            name: item,
            path: itemPath,
            lastModified: stats.mtime
          };
        }
        return null;
      });
      const projects = await Promise.all(
        [...promiseQueue, this.readReportFile()]
      ); 
      
      return {
        success: true,
        projects: flatten(projects).filter(Boolean),
        message: '获取项目列表成功'
      };
    } catch (error: any) {
      console.error('Get cloned projects error:', error);
      return {
        success: false,
        message: `获取项目列表失败: ${error.message}`,
        projects: []
      };
    }
  }

  async cloneRepository(url: string) {
    try {
      // 确保克隆目录存在
      await fs.ensureDir(this.cloneDir);

      // 执行 git clone
      const { stdout, stderr } = await execAsync(`git clone ${url}`, {
        cwd: this.cloneDir,
        env: { ...process.env, GIT_SSL_NO_VERIFY: '1' }
      });
      if (stderr && !stderr.includes('Cloning into')) {
        throw new Error(stderr);
      }

      // 获取克隆后的项目目录名
      const repoName = url.split('/').pop()?.replace('.git', '') || '';
      const projectPath = path.join(this.cloneDir, repoName);

      // 检查项目目录是否存在
      if (!await fs.pathExists(projectPath)) {
        throw new Error('项目目录不存在');
      }

      // 构建目录树
      const tree = await buildDirectoryTree(projectPath);

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