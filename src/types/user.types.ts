// 用户基础信息
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

// 用户角色枚举
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  MODERATOR = 'moderator',
}

// 用户状态枚举
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  PENDING = 'pending',
}

// 用户登录请求参数
export interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

// 用户注册请求参数
export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 用户信息更新参数
export interface UpdateUserParams {
  username?: string;
  email?: string;
  avatar?: string;
  role?: UserRole;
}

// 用户认证响应
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
