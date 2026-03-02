// src/App.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// 导入封装好的路由组件和路由数组（用于导航）
import { AppRoutes, routes } from './router';

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* 导航栏：也可以基于routes数组动态生成（可选） */}
      <nav style={{ marginBottom: 20 }}>
        {/* 方式1：手动写导航（简单场景） */}
        {/* <Link to="/" style={{ marginRight: 10 }}>首页</Link>
        <Link to="/about" style={{ marginRight: 10 }}>关于</Link>
        <Link to="/user/123" style={{ marginRight: 10 }}>用户123</Link> */}

        {/* 方式2：基于routes数组动态生成（推荐，维护更方便） */}
        {routes
          .filter((route) => route.name && route.path !== '*') // 过滤404和无名称的路由
          .map((route) => (
            <Link key={route.path} to={route.path} style={{ marginRight: 10 }}>
              {route.name}
            </Link>
          ))}
      </nav>

      {/* 引入封装好的路由组件，替代原来的Routes/Route */}
      <AppRoutes />
    </div>
  );
};

export default App;
