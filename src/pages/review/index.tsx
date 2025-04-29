import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Tree } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import styles from './index.less';
import { useModel } from '@umijs/max';
import CodeEditor from '@/components/CodeEditor';
import '@uiw/file-icons/fonts/ffont.css';
import fileIcons from './fileIcons.json';

const { Content, Sider } = Layout;

// 获取文件图标类名和颜色
const getFileIcon = (name: string, isDirectory: boolean) => {
  if (isDirectory) {
    return {
      icon: 'ffont-folder',
      color: 'medium-blue'
    };
  }
  
  const ext = name.split('.').pop()?.toLowerCase();
  if (!ext) {
    return {
      icon: 'ffont-file',
      color: 'medium-gray'
    };
  }

  // 如果扩展名在映射表中，使用对应的图标和颜色
  if (fileIcons[ext]) {
    return fileIcons[ext];
  }

  // 默认使用文件图标
  return {
    icon: 'ffont-file',
    color: 'medium-gray'
  };
};

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useModel('tree');
  const [treeData, setTreeData] = useState<any>([]);
  const [filePath, setFilePath] = useState<string | null>(null);

  useEffect(() => {
    setTreeData(state.treeData);
  }, [state]);

  const onSelect = (selectedKeys: React.Key[]) => {
    setFilePath(selectedKeys[0] as string);
  };

  // 处理树形数据，添加图标和颜色
  const processedTreeData = React.useMemo(() => {
    const processNode = (node: any) => {
      const isDirectory = !!node.children;
      const { icon, color } = getFileIcon(node.name, isDirectory);
      
      return {
        ...node,
        title: (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <i className={`ffont ${icon} ${color}`} style={{ 
              marginRight: 8, 
              display: 'flex', 
              alignItems: 'center',
              color: color === 'medium-yellow' ? '#ffd700' :
                     color === 'medium-blue' ? '#1e90ff' :
                     color === 'medium-red' ? '#ff4500' :
                     color === 'medium-purple' ? '#9370db' :
                     color === 'medium-orange' ? '#ffa500' :
                     color === 'medium-green' ? '#32cd32' :
                     color === 'medium-pink' ? '#ff69b4' :
                     '#808080' // medium-gray
            }} />
            {node.name}
          </span>
        ),
        children: node.children?.map(processNode),
      };
    };

    return treeData.map(processNode);
  }, [treeData]);

  return (
    <Layout className={styles.layout}>
      <div className={styles.breadcrumb}>
        <Breadcrumb
          items={[
            {
              title: <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><ArrowLeftOutlined style={{ marginRight: '8px' }} /> 返回</div>,
              onClick: () => navigate(-1),
            },
          ]}
        />
      </div>
      <Layout>
        <Sider width={300} className={styles.sider}>
          {/* 目录树区域 */}
          <div className={styles.treeContainer}>
            {/* 这里将展示上传页返回的目录树 */}
            <Tree
              treeData={processedTreeData}
              fieldNames={{
                title: 'title',
                key: 'path',
                children: 'children',
              }}
              defaultExpandAll
              onSelect={(selectedKeys, info) => {
                // 只允许选择叶子节点
                if (info.node.children) {
                  return;
                }
                onSelect(selectedKeys);
              }}
              selectable={true}
              showLine={true}
              blockNode={true}
            />
          </div>
        </Sider>
        <Content className={styles.content}>
          {/* 代码展示区域 */}
          <div className={styles.codeContainer}>
            {/* 这里将展示代码内容 */}
            <CodeEditor path={filePath} />
          </div>
        </Content>
        <Sider width={300} className={styles.sider}>
          {/* AI 聊天框区域 */}
          <div className={styles.chatContainer}>
            {/* 这里将放置 AI 聊天框 */}
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default ReviewPage; 