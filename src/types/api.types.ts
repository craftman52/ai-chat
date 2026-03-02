// 通用API响应
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 分页响应
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 错误响应
export interface ErrorResponse {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string; // 开发环境使用
}

// 请求配置
export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
}
