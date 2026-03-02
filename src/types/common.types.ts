// 通用状态类型
export type Status = 'idle' | 'loading' | 'success' | 'error';

// 日期范围
export interface DateRange {
  startDate: string;
  endDate: string;
}

// 选项类型（用于下拉框等）
export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

// 树形节点
export interface TreeNode<T = any> {
  id: string;
  label: string;
  children?: TreeNode<T>[];
  data?: T;
  disabled?: boolean;
  expanded?: boolean;
}

// 文件上传信息
export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status?: 'uploading' | 'done' | 'error';
  percent?: number;
  response?: any;
  error?: any;
}

// 坐标点
export interface Point {
  x: number;
  y: number;
}

// 键值对
export interface KeyValuePair<K = string, V = any> {
  key: K;
  value: V;
}
