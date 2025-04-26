import { defineConfig } from "@umijs/max";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
    { path: "/review", component: "review" },
  ],

  npmClient: "pnpm",
  
  // 添加全局样式
  styles: ['/src/global.less'],

  alias: {
    '@': '/src',
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },

  // 启用插件
  model: {},
  antd: {},
  valtio: {},
});
