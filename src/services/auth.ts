import type { LoginForm, RegisterForm, AuthResponse } from '../types/auth';

// 模拟 API 调用
const mockApi = {
  login: async (data: LoginForm): Promise<AuthResponse> => {
    // 模拟网络请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟验证
    if (data.phone === '13800138000' && data.password === '123456') {
      return {
        token: 'mock-token-' + Date.now(),
        user: {
          id: '1',
          phone: data.phone,
          nickname: '测试用户',
          avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=400&fit=crop',
        },
      };
    }

    throw new Error('手机号或密码错误');
  },

  register: async (data: RegisterForm): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟注册成功
    return {
      token: 'mock-token-' + Date.now(),
      user: {
        id: Date.now().toString(),
        phone: data.phone,
        nickname: data.nickname || '新用户',
      },
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const authService = mockApi;
