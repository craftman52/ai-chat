// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import User from './pages/User'; // 引入User组件

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* 导航链接：Link 替代 a 标签，避免页面刷新 */}
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>
          首页
        </Link>
        <Link to="/about" style={{ marginRight: 10 }}>
          关于
        </Link>
        <Link to="/user/123" style={{ marginRight: 10 }}>
          用户123
        </Link>
      </nav>

      {/* 路由规则：Routes 包裹所有 Route，匹配对应路径渲染组件 */}
      <Routes>
        {/* 首页路由：path 为 '/'，element 为要渲染的组件 */}
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        {/* 关于页路由 */}
        <Route path="/about" element={<About />} />
        {/* 404路由：path="*" 匹配所有未定义的路径 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
