import { Tabs, Input, Upload, Button, message, Space } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import styles from './home.less';
import { useState } from 'react';
import { gitService } from '@/services/git';
import { uploadService } from '@/services/upload';

export default function HomePage() {
  const [gitUrl, setGitUrl] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleGitUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitUrl(e.target.value);
  };

  const handleSubmit = async () => {
    if (activeTab === '1') {
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
    }
  };

  const handleUpload = async (info: any) => {
    console.log('info', info);
    if (info.file.status === 'loading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      try {
        const formData = new FormData();
        formData.append('files', info.file.originFileObj);
        
        const response = await uploadService.upload(formData);
        message.success(response.message);
      } catch (error) {
        console.error('Upload error:', error);
        // 错误已在响应拦截器中处理
      } finally {
        setLoading(false);
      }
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error(`${info.file.name} 上传失败`);
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
          <Upload
            directory
            onChange={handleUpload}
            showUploadList={false}
          >
            <Button 
              icon={<UploadOutlined />}
              className={styles.uploadButton}
              loading={loading}
            >
              上传文件夹
            </Button>
          </Upload>
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
