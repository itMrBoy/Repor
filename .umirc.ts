import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "home" }],

  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  
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
});
