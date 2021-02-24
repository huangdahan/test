import axios from 'axios';
import { MessageBox } from 'element-ui';
// 创建实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // 使用代理，不需要这只该项
  timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    let data = response.data;
    if (data.success) {
      return data;
    } else {
      const err = new Error(data.message);
      err.response = response;
      return Promise.reject(err);
    }
  },
  error => {
    let errorInfo = {};
    if (error.response) {
      errorInfo.errCode = error.response.status;
    }
    MessageBox.confirm(error.message, '错误', {
      type: 'error'
    });
    return Promise.reject(errorInfo);
  }
);

export default service;
