import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Tree } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import styles from './index.less';
import { useModel } from '@umijs/max';
import CodeEditor from '@/components/CodeEditor';

const { Content, Sider } = Layout;

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
              treeData={treeData}
              fieldNames={{
                title: 'name',
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