import React from 'react';
import { Button, Space, Toast } from 'antd-mobile';
const Home: React.FC = () => {
  const handleClick = () => {
    Toast.show({
      content: '点击了按钮',
    });
  };
  return (
    <Space style={{ padding: 20 }}>
      <Button color="primary" onClick={handleClick}>
        主要按钮
      </Button>
      <Button color="success">成功按钮</Button>
      <Button color="danger">危险按钮</Button>
    </Space>
  );
};

export default Home;
