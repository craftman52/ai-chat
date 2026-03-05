import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Toast } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline, PhoneFill } from 'antd-mobile-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginForm } from '../../types/auth';
import styles from './index.module.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onFinish = async (values: LoginForm) => {
    try {
      setLoading(true);
      await login(values);
      Toast.show({
        content: '登录成功',
        position: 'bottom',
      });
      navigate('/home');
    } catch (error) {
      Toast.show({
        content: error instanceof Error ? error.message : '登录失败',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>欢迎回来</h1>
        <p className={styles.subtitle}>请输入您的账号信息登录</p>
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            loading={loading}
            className={styles.submitButton}
          >
            登录
          </Button>
        }
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" clearable />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6位' },
          ]}
        >
          <div className={styles.passwordInput}>
            <Input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" clearable />
            <div className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
            </div>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.rememberRow}>
            <Checkbox name="remember">记住密码</Checkbox>
            <Link to="/forgot-password" className={styles.forgotLink}>
              忘记密码?
            </Link>
          </div>
        </Form.Item>
      </Form>

      <div className={styles.registerSection}>
        <span>还没有账号？</span>
        <Link to="/register" className={styles.registerLink}>
          立即注册
        </Link>
      </div>

      <div className={styles.agreement}>
        登录即表示您同意
        <Link to="/terms">用户协议</Link>和<Link to="/privacy">隐私政策</Link>
      </div>
    </div>
  );
};

export default Login;
