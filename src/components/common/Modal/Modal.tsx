import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { ModalOptions, ModalInstance } from './types';
import { ModalPosition, ModalSize, ModalTheme, ModalAnimation } from './types';
import { ModalPortal } from './ModalPortal';
import styles from './styles.module.css';

// 默认配置
const defaultOptions: Partial<ModalOptions> = {
  position: ModalPosition.CENTER,
  size: ModalSize.MEDIUM,
  theme: ModalTheme.LIGHT,
  animation: ModalAnimation.FADE,
  mask: true,
  maskClosable: true,
  closable: true,
  keyboard: true,
  destroyOnClose: false,
  closeOnEsc: true,
  okText: '确认',
  cancelText: '取消',
  confirmLoading: false,
  zIndex: 1000,
  transitionDuration: 300,
};

export interface ModalProps extends ModalOptions {
  onInstanceReady?: (instance: ModalInstance) => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  // 合并默认配置
  const options = { ...defaultOptions, ...props };

  const {
    title,
    content,
    footer,
    visible = false,
    mask,
    maskClosable,
    closable,
    keyboard,
    destroyOnClose,
    closeOnEsc,
    onOk,
    onCancel,
    onClose,
    afterClose,
    onOpen,
    okText,
    cancelText,
    confirmLoading,
    okButtonProps,
    cancelButtonProps,
    okDisabled,
    cancelDisabled,
    width,
    height,
    position,
    size,
    theme,
    animation,
    className,
    maskClassName,
    modalClassName,
    bodyStyle,
    maskStyle,
    zIndex,
    transitionDuration,
    footerRender,
    titleRender,
    onInstanceReady,
  } = options;

  // 状态管理
  const [internalVisible, setInternalVisible] = useState(visible);
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0 });

  // 控制显示/隐藏
  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      setIsClosing(false);
      onOpen?.();
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setInternalVisible(false);
        setIsClosing(false);
        afterClose?.();
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [visible, transitionDuration, onOpen, afterClose]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyboard && closeOnEsc && e.key === 'Escape' && internalVisible) {
        handleCancel(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [internalVisible, keyboard, closeOnEsc]);

  // 防止滚动
  useEffect(() => {
    if (internalVisible && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [internalVisible, isClosing]);

  // 处理取消/关闭
  const handleCancel = useCallback(
    async (e?: React.MouseEvent | React.KeyboardEvent) => {
      if (onCancel) {
        try {
          await onCancel(e);
        } catch (error) {
          console.error('Modal cancel error:', error);
          return;
        }
      }
      onClose?.();
    },
    [onCancel, onClose]
  );

  // 处理确认
  const handleOk = useCallback(
    async (e: React.MouseEvent) => {
      if (onOk) {
        try {
          await onOk(e);
        } catch (error) {
          console.error('Modal ok error:', error);
        }
      }
    },
    [onOk]
  );

  // 点击遮罩
  const handleMaskClick = useCallback(
    (e: React.MouseEvent) => {
      if (maskClosable && e.target === e.currentTarget) {
        handleCancel(e);
      }
    },
    [maskClosable, handleCancel]
  );

  // 拖动功能
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!options.draggable || !modalRef.current) return;

      setIsDragging(true);
      const rect = modalRef.current.getBoundingClientRect();
      dragRef.current = {
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        offsetX: 0,
        offsetY: 0,
      };
    },
    [options.draggable]
  );

  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !modalRef.current) return;

      e.preventDefault();
      const newX = e.clientX - dragRef.current.startX;
      const newY = e.clientY - dragRef.current.startY;

      modalRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // 暴露实例方法
  useEffect(() => {
    if (onInstanceReady) {
      const instance: ModalInstance = {
        show: () => setInternalVisible(true),
        hide: () => handleCancel(),
        toggle: () => setInternalVisible((prev) => !prev),
        update: (newOptions) => {
          // 更新逻辑（简化）
          Object.assign(options, newOptions);
        },
        destroy: () => {
          setInternalVisible(false);
          setTimeout(() => {
            // 清理逻辑
          }, transitionDuration);
        },
        setLoading: (loading) => {
          // 设置加载状态（需要在state中添加loading状态）
          console.log('set loading:', loading);
        },
      };
      onInstanceReady(instance);
    }
  }, [onInstanceReady, handleCancel, transitionDuration]);

  if (!internalVisible && destroyOnClose) {
    return null;
  }

  // 计算类名
  const modalClasses = [
    styles.modal,
    styles[`modal-${position}`],
    styles[`modal-${size}`],
    styles[`modal-${theme}`],
    animation !== ModalAnimation.NONE && styles[`modal-animation-${animation}`],
    isClosing && styles['modal-closing'],
    modalClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ModalPortal>
      {mask && (
        <div
          className={`${styles['modal-mask']} ${maskClassName || ''}`}
          style={{ zIndex: (zIndex || 1000) - 1, ...maskStyle }}
          onClick={handleMaskClick}
        />
      )}
      <div className={`${styles['modal-wrapper']} ${className || ''}`} style={{ zIndex }}>
        <div
          ref={modalRef}
          className={modalClasses}
          style={{
            width,
            height,
            transitionDuration: `${transitionDuration}ms`,
            ...bodyStyle,
          }}
        >
          {/* 标题区域 */}
          {(title || closable) && (
            <div
              className={styles['modal-header']}
              onMouseDown={options.draggable ? handleDragStart : undefined}
            >
              {titleRender ? (
                titleRender({ onClose: () => handleCancel() })
              ) : (
                <>
                  <div className={styles['modal-title']}>{title}</div>
                  {closable && (
                    <button
                      className={styles['modal-close']}
                      onClick={() => handleCancel()}
                      aria-label="关闭"
                    >
                      ×
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* 内容区域 */}
          <div className={styles['modal-body']}>{content}</div>

          {/* 底部区域 */}
          {footer !== null && (
            <div className={styles['modal-footer']}>
              {footerRender
                ? footerRender({ onOk: handleOk, onCancel: () => handleCancel() })
                : footer || (
                    <>
                      <button
                        className={styles['modal-btn-cancel']}
                        onClick={() => handleCancel()}
                        disabled={cancelDisabled}
                        {...cancelButtonProps}
                      >
                        {cancelText}
                      </button>
                      <button
                        className={styles['modal-btn-ok']}
                        onClick={handleOk}
                        disabled={okDisabled}
                        {...okButtonProps}
                      >
                        {confirmLoading ? '加载中...' : okText}
                      </button>
                    </>
                  )}
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};
