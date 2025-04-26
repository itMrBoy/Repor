import components from 'prismjs/components.json';

export interface PrismLanguage {
  title: string;
  alias?: string[];
  aliasTitles?: Record<string, string>;
  option?: string;
  owner?: string;
  require?: string[];
}

export interface PrismComponent {
  meta: {
    path: string;
    noCSS: boolean;
    require: string[];
  };
  languages: Record<string, PrismLanguage>;
}

// 获取所有支持的语言
export const getAllLanguages = (): string[] => {
  return Object.keys(components.languages);
};

// 获取语言配置
export const getLanguageConfig = (lang: string): PrismLanguage | undefined => {
  return components.languages[lang];
};

// 获取语言别名
export const getLanguageAliases = (lang: string): string[] => {
  const config = getLanguageConfig(lang);
  if (!config) return [];
  return config.alias || [];
};

// 生成扩展名到语言的映射
export const generateLanguageMap = (): Record<string, string> => {
  const map: Record<string, string> = {};
  
  Object.entries(components.languages).forEach(([lang, config]) => {
    // 添加主语言
    map[lang] = lang;
    // 添加别名
    if (config.alias instanceof Array) {
      config.alias.forEach(alias => {
        map[alias] = lang;
      });
    }
    if (typeof config.alias === 'string') {
        map[config.alias] = lang;
    }
  });
  
  return map;
}; 