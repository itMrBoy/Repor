import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { fileService } from '@/services/file';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { generateLanguageMap } from '@/utils/prism-languages';
import styles from './index.less';

interface CodeEditorProps {
  path?: string;
}

const languageMap = generateLanguageMap();

const CodeEditor: React.FC<CodeEditorProps> = ({ path }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('plaintext');

  useEffect(() => {
    if (path) {
      fetchFileContent();
      loadLanguage();
    }
  }, [path]);

  useEffect(() => {
    // 每次content更新后重新高亮
    Prism.highlightAll();
  }, [content, language]);

  const loadLanguage = async () => {
    if (!path) return;
    
    const ext = path.split('.').pop()?.toLowerCase();
    if (!ext || !languageMap[ext]) return;

    const lang = languageMap[ext];
    setLanguage(lang);

    try {
      // 动态导入语言组件
      await import(`prismjs/components/prism-${lang}`);
    } catch (error) {
      console.error(`Failed to load language component for ${lang}:`, error);
    }
  };

  const fetchFileContent = async () => {
    setLoading(true);
    try {
      const response = await fileService.getFileContent(path!);
      if (response.code === 200) {
        setContent(response.data.content);
      }
    } catch (error) {
      console.error('获取文件内容失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <Spin spinning={loading}>
        <pre className={styles.codeContent}>
          <code className={`language-${language}`}>
            {content}
          </code>
        </pre>
      </Spin>
    </div>
  );
};

export default CodeEditor; 