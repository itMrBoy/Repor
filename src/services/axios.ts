import axios from "axios";
import { message } from "antd";

// 创建 axios 实例
const request = axios.create({
  baseURL: "/api",
  timeout: 60 * 1000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求头等配置
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 统一处理响应
    if (data.code !== 200) {
      message.error(data.message || "请求失败");
      return Promise.reject(new Error(data.message || "请求失败"));
    }
    return data;
  },
  (error) => {
    // 统一处理错误
    message.error(error.message || "请求失败");
    return Promise.reject(error);
  },
);

export default request;
