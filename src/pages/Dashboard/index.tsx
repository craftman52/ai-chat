// src/pages/Dashboard.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>控制台</h2>
      <nav style={{ marginBottom: 10 }}>
        <Link to="/dashboard/home" style={{ marginRight: 10 }}>
          首页
        </Link>
        <Link to="/dashboard/setting" style={{ marginRight: 10 }}>
          设置
        </Link>
      </nav>
      {/* Outlet 是子路由的渲染容器 */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
