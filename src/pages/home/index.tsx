import { Tabs, Input, Button, message, Space, List, Typography } from 'antd';
import { SendOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './home.less';
import { useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import { useModel } from '@umijs/max';
import dayjs from 'dayjs';
import { fileListService } from '@/services';

export default function HomePage() {
  const [gitUrl, setGitUrl] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [path, setPath] = useState('');
  const [clonedProjects, setClonedProjects] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const { state, actions } = useModel('tree');
  const { loading } = state;

  useEffect(() => {
    fetchClonedProjects();
  }, []);

  const fetchClonedProjects = async () => {
    try {
      const response = await fileListService();
      setClonedProjects(response.data);
    } catch (error) {
      console.error('Fetch projects error:', error);
      message.error('获取项目列表失败');
    }
  };

  const handleProjectSelect = async (projectPath: string) => {
    try {
      const response = await actions.fetchTreeData(projectPath, 'path');
      if (response.success) {
        message.success('项目加载成功');
        navigate('/review');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Load project error:', error);
      message.error('加载项目失败');
    }
  };

  const handleGitUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitUrl(e.target.value);
  };

  const handleGitUrlSubmit = async () => {
    if (!gitUrl) {
      message.warning('请输入Git仓库地址');
      return;
    }
    
    try {
      const response = await actions.fetchTreeData(gitUrl, 'git');
      if (response.success) {
        message.success(response.message);
        return response;
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Git clone error:', error);
    }
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value);
  };

  const handleProjectSubmit = async () => {
    if (!path) {
      message.warning('请输入项目路径');
      return Promise.reject();
    }

    try {
      const response = await actions.fetchTreeData(path, 'path');
      if (response.success) {
        message.success(response.message);
        return response;
      } else {
        message.error(response.message);
        return Promise.reject();
      }
    } catch (error) {
      console.error('Analyze error:', error);
      message.error('分析失败');
      return Promise.reject();
    }
  };

  const handleSubmit = async () => {
    let response;
    if (activeTab === '1') {
      response = await handleGitUrlSubmit();
    } else {
      response = await handleProjectSubmit();
    }
    if (response?.success) {
      navigate('/review');
    }
  };

  const items = [
    {
      key: '1',
      label: '历史项目',
      children: (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <List
            dataSource={clonedProjects}
            renderItem={(project) => (
              <List.Item style={{ padding: '8px 0' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  width: '100%',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '16px', marginBottom: '4px', cursor: 'pointer' }} onClick={() => handleProjectSelect(project.path)}>{project.name}（ {project.path} ）</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>
                    <ClockCircleOutlined style={{ marginRight: '4px' }} />
                    {dayjs(project.lastModified).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: '2',
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
      key: '3',
      label: '本地项目',
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
