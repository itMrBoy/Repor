import { useState, useCallback } from 'react';
import { gitService, analyzeService } from '@/services/index'
import { message } from 'antd';

interface TreeState {
  loading: boolean;
  treeData: any;
  error: string | null;
}

export default function useTreeModel() {
  const [state, setState] = useState<TreeState>({
    loading: false,
    treeData: [],
    error: null,
  });

  const fetchTreeData = useCallback(async (url: string, type: 'git' | 'path') => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      let response;
      if (type === 'git') {
        response = await gitService.clone(url);
      } else {
        response = await analyzeService.analyze(url);
      }
      
      if (+response.code !== 200) {
        message.warning(response.message || '请求失败');
        throw new Error('请求失败');
      }
      
      const treeData = response.data?.tree || [];
      setState(prev => ({ ...prev, treeData, loading: false }));
      return { success: true, ...response };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setState(prev => ({ ...prev, treeData: [], error: errorMessage, loading: false }));
      return { success: false, message: errorMessage };
    }
  }, []);

  return {
    state,
    actions: {
      fetchTreeData,
    },
  };
} 