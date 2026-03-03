import { defineConfig } from 'vite';
import path from 'path'; // 引入 path 模块
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // React 插件
  resolve: {
    alias: {
      // 将 '@' 指向 'src' 目录
      '@': path.resolve(__dirname, './src'),
      // 如果需要，可以配置更多别名
      // '@components': path.resolve(__dirname, './src/components'),
      // '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
