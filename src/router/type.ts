// src/router/type.ts
import type { ReactNode } from 'react';

// 定义单个路由的类型
export interface RouteItem {
  path: string; // 路由路径
  element: ReactNode; // 路由渲染的组件
  name?: string; // 路由名称（可选，用于导航）
  children?: RouteItem[]; // 子路由（可选）
}
