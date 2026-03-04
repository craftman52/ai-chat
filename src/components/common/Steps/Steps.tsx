// src/components/common/Steps/Steps.tsx
import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './Steps.module.css';

// 步骤项类型定义
export interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 步骤状态（优先级高于组件自动计算） */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

// 步骤条组件 Props 类型
export interface StepsProps {
  /** 当前步骤索引 (从0开始) */
  current?: number;
  /** 步骤数据 */
  items: StepItem[];
  /** 步骤方向 */
  direction?: 'horizontal' | 'vertical';
  /** 点击步骤回调 */
  onChange?: (current: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 步骤条尺寸 */
  size?: 'default' | 'small';
  /** 是否显示步骤条连接线 */
  showLine?: boolean;
  /** 步骤状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

/**
 * Steps 步骤条组件
 * 引导用户按照流程完成任务的分步导航条
 *
 * @example
 * ```tsx
 * <Steps
 *   current={1}
 *   items={[
 *     { title: '第一步', description: '注册账号' },
 *     { title: '第二步', description: '填写信息' },
 *     { title: '第三步', description: '完成' }
 *   ]}
 *   onChange={(index) => console.log(index)}
 * />
 * ```
 */
export const Steps: React.FC<StepsProps> = ({
  current = 0,
  items,
  direction = 'horizontal',
  onChange,
  className,
  style,
  size = 'default',
  showLine = true,
  status = 'process',
}) => {
  // 计算每个步骤的状态
  const stepsWithStatus = useMemo(() => {
    return items.map((item, index) => {
      // 如果 item 已有自定义状态，优先使用
      if (item.status) return item;

      let stepStatus: StepItem['status'] = 'wait';

      if (index < current) {
        stepStatus = 'finish';
      } else if (index === current) {
        stepStatus = status;
      }

      return {
        ...item,
        status: stepStatus,
      };
    });
  }, [items, current, status]);

  // 处理步骤点击
  const handleStepClick = (index: number) => {
    if (onChange) {
      onChange(index);
    }
  };

  // 容器类名
  const containerClass = classNames(
    styles.steps,
    styles[`steps-${direction}`],
    styles[`steps-${size}`],
    {
      [styles['steps-show-line']]: showLine,
    },
    className
  );

  return (
    <div className={containerClass} style={style} role="list" aria-label="步骤条">
      {stepsWithStatus.map((step, index) => {
        const isLast = index === items.length - 1;
        const stepStatus = step.status || 'wait';

        return (
          <div
            key={index}
            className={classNames(
              styles.step,
              styles[`step-${stepStatus}`],
              styles[`step-${direction}`],
              {
                [styles['step-clickable']]: !!onChange,
                [styles['step-last']]: isLast,
              }
            )}
            onClick={() => handleStepClick(index)}
            role="listitem"
            aria-current={stepStatus === 'process' ? 'step' : undefined}
          >
            <div className={styles['step-header']}>
              <div className={styles['step-icon-container']}>
                {step.icon ? (
                  step.icon
                ) : (
                  <span className={styles['step-icon']}>
                    {stepStatus === 'finish' && '✓'}
                    {stepStatus === 'error' && '✕'}
                    {stepStatus === 'process' && index + 1}
                    {stepStatus === 'wait' && index + 1}
                  </span>
                )}
              </div>
              {!isLast && showLine && <div className={styles['step-line']} />}
            </div>

            <div className={styles['step-content']}>
              <div className={styles['step-title']}>{step.title}</div>
              {step.description && (
                <div className={styles['step-description']}>{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Steps.displayName = 'Steps';

export default Steps;
