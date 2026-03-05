export interface LoginForm {
  phone: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  phone: string;
  password: string;
  confirmPassword: string;
  nickname?: string;
  agreeProtocol?: boolean;
}

export interface UserInfo {
  id: string;
  phone: string;
  nickname?: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: UserInfo;
}
