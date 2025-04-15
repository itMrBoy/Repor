import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "home" }],

  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  
  // 添加全局样式
  styles: ['/src/global.less'],
});
