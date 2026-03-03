import type React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
  containerId?: string;
}

// Modal Portal 组件：将Modal渲染到body指定容器
export const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  containerId = 'modal-root',
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // 创建或获取容器元素
    let modalContainer = document.getElementById(containerId);

    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = containerId;
      document.body.appendChild(modalContainer);
    }

    setContainer(modalContainer);

    return () => {
      // 清理：如果没有子节点，移除容器
      if (modalContainer?.children.length === 0) {
        document.body.removeChild(modalContainer);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return ReactDOM.createPortal(children, container);
};
