<!-- src/components/common/Steps/README.md -->

# Steps 步骤条组件

引导用户按照流程完成任务的分步导航条。

## 何时使用

- 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。
- 需要展示当前进度时。

## 代码演示

### 基础用法

```tsx
import { Steps } from '@/components/common/Steps';

const steps = [
  { title: '第一步', description: '注册账号' },
  { title: '第二步', description: '填写信息' },
  { title: '第三步', description: '完成' },
];

<Steps current={1} items={steps} />;
```
