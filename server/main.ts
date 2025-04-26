import express from 'express';
import { json } from 'body-parser';
import { GitController } from './controllers/git.controller';
import { AnalyzeController } from './controllers/analyze.controller';
import { FileController } from './controllers/file.controller';
import cors from 'cors';

const app = express();
const port = 3000;

// 中间件
app.use(json());
app.use(cors({
  origin: 'http://localhost:8000', // 前端开发服务器地址
  credentials: true,
}));

// 请求日志中间件
app.use((req, res, next) => {
  next();
});

// 路由
app.post('/api/git/clone', (req, res) => {
  console.log('收到克隆请求:', req.body);
  GitController.cloneRepository(req, res);
});

app.post('/api/analyze', (req, res) => {
  console.log('收到上传请求');
  AnalyzeController.analyze(req, res);
});

app.get('/api/file/content', (req, res) => {
  console.log('收到文件内容请求:', req.query);
  FileController.getFileContent(req, res);
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('错误:', err.stack);
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    timestamp: Date.now()
  });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://127.0.0.1:${port}`);
}); 