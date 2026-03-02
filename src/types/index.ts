// 统一导出所有类型，方便导入
export * from './user.types';
export * from './message.types';
export * from './api.types';
export * from './common.types';

// 可以在这里添加全局类型声明
declare global {
  // 扩展Window接口
  interface Window {
    __INITIAL_STATE__?: any;
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }

  // 环境变量类型
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      REACT_APP_API_URL: string;
      REACT_APP_WS_URL: string;
    }
  }
}
