import React, { useState } from 'react';

interface Props {
  title: string;
}

// 测试 any
const testAny: any = 'test'; // 应该警告

// 测试未使用变量
const unused = 'unused'; // 应该报错

// 测试类型导入
import type { FC } from 'react'; // 应该符合规则

const App: FC<Props> = ({ title }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};

export default App;
