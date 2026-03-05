// src/router/type.ts
import type { ReactNode } from 'react';

// 定义单个路由的类型
export interface RouteItem {
  path: string;
  name?: string;
  element: ReactNode;
  children?: RouteItem[];
}
