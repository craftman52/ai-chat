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

  const [form] = Form.useForm();

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>创建账号</h1>
        <p className={styles.subtitle}>填写以下信息完成注册</p>
      </div>

      <Form
        form={form}
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
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '隐藏密码' : '显示密码'}
            >
              {showPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
            </button>
          </div>
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            {
              validator: async (rule, value) => {
                const password = form.getFieldValue('password');
                if (value && value !== password) {
                  return Promise.reject('两次输入的密码不一致');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div className={styles.passwordInput}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="请再次输入密码"
              clearable
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
            >
              {showConfirmPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
            </button>
          </div>
        </Form.Item>

        <Form.Item
          name="agreeProtocol"
          rules={[
            {
              validator: async (_, value) => {
                if (!value) {
                  return Promise.reject('请阅读并同意用户协议和隐私政策');
                }
                return Promise.resolve();
              },
            },
          ]}
          valuePropName="checked" // 重要：Checkbox 的 value 属性是 checked
        >
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
