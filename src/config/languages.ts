export interface LanguageConfig {
  extensions: string[];
  prismLanguage: string;
}

export const languageConfigs: LanguageConfig[] = [
  { extensions: ["js"], prismLanguage: "javascript" },
  { extensions: ["jsx"], prismLanguage: "jsx" },
  { extensions: ["ts"], prismLanguage: "typescript" },
  { extensions: ["tsx"], prismLanguage: "tsx" },
  { extensions: ["css"], prismLanguage: "css" },
  { extensions: ["less"], prismLanguage: "less" },
  { extensions: ["scss"], prismLanguage: "scss" },
  { extensions: ["json"], prismLanguage: "json" },
  { extensions: ["md"], prismLanguage: "markdown" },
  { extensions: ["py"], prismLanguage: "python" },
  { extensions: ["java"], prismLanguage: "java" },
  { extensions: ["html"], prismLanguage: "html" },
  { extensions: ["xml"], prismLanguage: "xml" },
  { extensions: ["sql"], prismLanguage: "sql" },
  { extensions: ["sh"], prismLanguage: "bash" },
  { extensions: ["yml", "yaml"], prismLanguage: "yaml" },
  { extensions: ["go"], prismLanguage: "go" },
  { extensions: ["rb"], prismLanguage: "ruby" },
  { extensions: ["php"], prismLanguage: "php" },
  { extensions: ["c", "h"], prismLanguage: "c" },
  { extensions: ["cpp", "hpp"], prismLanguage: "cpp" },
  { extensions: ["cs"], prismLanguage: "csharp" },
  { extensions: ["swift"], prismLanguage: "swift" },
  { extensions: ["kt"], prismLanguage: "kotlin" },
  { extensions: ["rs"], prismLanguage: "rust" },
];

// 生成扩展名到语言的映射
export const languageMap = languageConfigs.reduce(
  (acc, config) => {
    config.extensions.forEach((ext) => {
      acc[ext] = config.prismLanguage;
    });
    return acc;
  },
  {} as Record<string, string>,
);
