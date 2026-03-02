// src/router/index.tsx
import type { RouteItem } from './type';
// 导入页面组件
import Home from '../pages/Home';
import About from '../pages/About';
import User from '../pages/User';
import NotFound from '../pages/NotFound';

import Dashboard from '../pages/Dashboard';
import DashboardHome from '../pages/DashboardHome';
import DashboardSetting from '../pages/DashboardSetting';

// 定义路由数组，集中管理所有路由规则
export const routes: RouteItem[] = [
  {
    path: '/',
    name: '首页',
    element: <Home />,
  },
  {
    path: '/dashboard',
    name: '控制台',
    element: <Dashboard />, // 父组件需要有 <Outlet /> 渲染子路由
    children: [
      {
        path: 'home', // 相对路径，等价于 /dashboard/home
        name: '控制台首页',
        element: <DashboardHome />,
      },
      {
        path: 'setting',
        name: '控制台设置',
        element: <DashboardSetting />,
      },
    ],
  },
  {
    path: '/about',
    name: '关于',
    element: <About />,
  },
  {
    path: '/user/:id',
    name: '用户详情',
    element: <User />,
  },
  {
    path: '*',
    name: '404',
    element: <NotFound />,
  },
];

// 封装路由渲染组件（可选，简化App.tsx代码）
import { Routes, Route } from 'react-router-dom';

export const AppRoutes = () => {
  // 递归渲染路由（包括子路由）
  const renderRoutes = (routes: RouteItem[]) => {
    return routes.map((route) => {
      if (route.children && route.children.length > 0) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {/* 渲染子路由 */}
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return <Route key={route.path} path={route.path} element={route.element} />;
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};
