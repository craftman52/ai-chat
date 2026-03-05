import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Toast } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { RegisterForm } from '../../types/auth';
import styles from './index.module.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = async (values: RegisterForm) => {
    try {
      setLoading(true);
      await register(values);
      Toast.show({
        content: '注册成功',
        position: 'bottom',
      });
      navigate('/home');
    } catch (error) {
      Toast.show({
        content: error instanceof Error ? error.message : '注册失败',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = (value: string, formValues: RegisterForm) => {
    if (value !== formValues.password) {
      throw new Error('两次输入的密码不一致');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>创建账号</h1>
        <p className={styles.subtitle}>填写以下信息完成注册</p>
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
            注册
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

        <Form.Item name="nickname" label="昵称（选填）">
          <Input placeholder="请输入昵称" clearable />
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

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            { required: true, message: '请再次输入密码' },
            { validator: validateConfirmPassword },
          ]}
        >
          <div className={styles.passwordInput}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="请再次输入密码"
              clearable
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
            </div>
          </div>
        </Form.Item>

        <Form.Item name="agreeProtocol">
          <Checkbox>
            我已阅读并同意
            <Link to="/terms" className={styles.protocolLink}>
              用户协议
            </Link>
            和
            <Link to="/privacy" className={styles.protocolLink}>
              隐私政策
            </Link>
          </Checkbox>
        </Form.Item>
      </Form>

      <div className={styles.loginSection}>
        <span>已有账号？</span>
        <Link to="/login" className={styles.loginLink}>
          立即登录
        </Link>
      </div>
    </div>
  );
};

export default Register;
