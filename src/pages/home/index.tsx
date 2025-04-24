import { Tabs, Input, Button, message, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './home.less';
import { useState } from 'react';
import { gitService, analyzeService } from '@/services/index';

export default function HomePage() {
  const [gitUrl, setGitUrl] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState('');

  const handleGitUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitUrl(e.target.value);
  };

  const handleGitUrlSubmit = async () => {
      if (!gitUrl) {
        message.warning('请输入Git仓库地址');
        return;
      }
      
      try {
        setLoading(true);
        const response = await gitService.clone(gitUrl);
        message.success(response.message);
      } catch (error) {
        console.error('Git clone error:', error);
        // 错误已在响应拦截器中处理
      } finally {
        setLoading(false);
      }
  };

  const handleSubmit = async () => {
    if (activeTab === '1') {
      handleGitUrlSubmit();
    } else {
      handleProjectSubmit();
    }
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value);
  };

  const handleProjectSubmit = async () => {
    if (!path) {
      message.warning('请输入项目路径');
      return;
    }

    try {
      setLoading(true);
      const response = await analyzeService.analyze(path);
      message.success(response.message);
    } catch (error) {
      console.error('Analyze error:', error);
      message.error('分析失败');
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Git源',
      children: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="请输入Git仓库地址"
            value={gitUrl}
            onChange={handleGitUrlChange}
            style={{ width: '100%', maxWidth: '500px' }}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            onClick={handleSubmit}
            className={styles.submitButton}
            loading={loading}
          >
            提交
          </Button>
        </Space>
      ),
    },
    {
      key: '2',
      label: '上传项目',
      children: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="请输入项目路径"
            value={path}
            onChange={handlePathChange}
            style={{ width: '100%', maxWidth: '500px' }}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            onClick={handleSubmit}
            className={styles.submitButton}
            loading={loading}
          >
            提交
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Repor</h1>
        <p className={styles.subtitle}>
          一个分析源码的ai助手
        </p>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(key) => setActiveTab(key)}
          className={styles.tabs}
        />
      </div>
    </div>
  );
}
