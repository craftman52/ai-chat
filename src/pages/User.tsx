// src/pages/User.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

// 定义路由参数的类型
interface UserParams {
  id: string; // 注意：路由参数默认是字符串类型
}

const User: React.FC = () => {
  // 使用 useParams 并指定类型，获得类型提示和校验
  const params = useParams<UserParams>();

  return (
    <div>
      <h3>用户详情页</h3>
      <p>用户ID：{params.id}</p>
    </div>
  );
};

export default User;
