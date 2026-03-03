import { useState, useCallback, useRef } from 'react';
import type { ModalOptions, ModalInstance } from './types';

export const useModal = (initialOptions?: ModalOptions) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions>(initialOptions || {});
  const modalInstanceRef = useRef<ModalInstance | null>(null);

  // 显示Modal
  const show = useCallback((showOptions?: ModalOptions) => {
    if (showOptions) {
      setOptions((prev) => ({ ...prev, ...showOptions }));
    }
    setVisible(true);
  }, []);

  // 隐藏Modal
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  // 切换显示状态
  const toggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  // 更新配置
  const update = useCallback((newOptions: Partial<ModalOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  // 设置加载状态
  const setLoading = useCallback((loading: boolean) => {
    setOptions((prev) => ({ ...prev, confirmLoading: loading }));
  }, []);

  // 获取实例
  const getInstance = useCallback(() => modalInstanceRef.current, []);

  // Modal组件属性
  const modalProps = {
    ...options,
    visible,
    onCancel: hide,
    onInstanceReady: (instance: ModalInstance) => {
      modalInstanceRef.current = instance;
    },
  };

  return {
    visible,
    show,
    hide,
    toggle,
    update,
    setLoading,
    getInstance,
    modalProps,
  };
};
