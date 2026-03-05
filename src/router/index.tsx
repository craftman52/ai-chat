import type { RouteItem } from './type';
import { Navigate } from 'react-router-dom';

// 导入页面组件
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import User from '../pages/User';
import NotFound from '../pages/NotFound';

import Dashboard from '../pages/Dashboard';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import DashboardSetting from '../pages/Dashboard/DashboardSetting';

// 导入认证相关
import { useAuth } from '../contexts/AuthContext';

// 受保护的路由组件
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        加载中...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// 公共路由组件（登录后不能访问）
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        加载中...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

// 定义路由数组，集中管理所有路由规则
export const routes: RouteItem[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    name: '首页',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    name: '登录',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    name: '注册',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    name: '控制台',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
    path: '/user/:id',
    name: '用户详情',
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    name: '404',
    element: <NotFound />,
  },
];

// 递归渲染路由的函数
const renderRouteElement = (route: RouteItem) => {
  if (route.children && route.children.length > 0) {
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children.map((child) => renderRouteElement(child))}
      </Route>
    );
  }
  return <Route key={route.path} path={route.path} element={route.element} />;
};

// 封装路由渲染组件
import { Routes, Route } from 'react-router-dom';

export const AppRoutes = () => {
  return <Routes>{routes.map((route) => renderRouteElement(route))}</Routes>;
};

// 为了方便在组件外部使用，也导出路由路径常量
export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DASHBOARD_HOME: '/dashboard/home',
  DASHBOARD_SETTING: '/dashboard/setting',
  USER: (id: string | number) => `/user/${id}`,
} as const;
