import type { ReactNode } from 'react';

// Modal 位置枚举
export enum ModalPosition {
  CENTER = 'center',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

// Modal 大小枚举
export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULLSCREEN = 'fullscreen',
  AUTO = 'auto',
}

// Modal 主题枚举
export enum ModalTheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

// Modal 动画枚举
export enum ModalAnimation {
  FADE = 'fade',
  SLIDE = 'slide',
  POP = 'pop',
  NONE = 'none',
}

// Modal 配置选项
export interface ModalOptions {
  // 基础属性
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  height?: number | string;
  zIndex?: number;

  // 位置和大小
  position?: ModalPosition;
  size?: ModalSize;

  // 样式主题
  theme?: ModalTheme;
  animation?: ModalAnimation;
  className?: string;
  maskClassName?: string;
  modalClassName?: string;

  // 行为控制
  visible?: boolean;
  mask?: boolean; // 是否显示遮罩
  maskClosable?: boolean; // 点击遮罩是否关闭
  closable?: boolean; // 是否显示关闭按钮
  keyboard?: boolean; // 是否支持键盘ESC关闭
  draggable?: boolean; // 是否可拖动
  resizable?: boolean; // 是否可调整大小
  destroyOnClose?: boolean; // 关闭时是否销毁内容
  closeOnEsc?: boolean; // 按ESC是否关闭
  closeOnOutsideClick?: boolean; // 点击外部是否关闭

  // 回调函数
  onOk?: (e?: React.MouseEvent) => void | Promise<any>;
  onCancel?: (e?: React.MouseEvent | React.KeyboardEvent) => void | Promise<any>;
  onClose?: () => void;
  afterClose?: () => void;
  onOpen?: () => void;

  // 按钮配置
  okText?: string;
  cancelText?: string;
  okButtonProps?: Record<string, any>;
  cancelButtonProps?: Record<string, any>;
  okDisabled?: boolean;
  cancelDisabled?: boolean;

  // 加载状态
  confirmLoading?: boolean;

  // 自定义渲染
  footerRender?: (props: { onOk: () => void; onCancel: () => void }) => ReactNode;
  titleRender?: (props: { onClose: () => void }) => ReactNode;

  // 其他配置
  prefixCls?: string;
  id?: string;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;

  // 动画相关
  transitionName?: string;
  maskTransitionName?: string;
  transitionDuration?: number;
}

// Modal 实例方法
export interface ModalInstance {
  show: (options?: ModalOptions) => void;
  hide: () => void;
  toggle: () => void;
  update: (options: Partial<ModalOptions>) => void;
  destroy: () => void;
  setLoading: (loading: boolean) => void;
}

// Modal 服务配置
export interface ModalServiceConfig extends ModalOptions {
  container?: HTMLElement;
  maxCount?: number; // 最大同时显示的Modal数量
}

// 模态框队列项
export interface ModalQueueItem {
  id: string;
  instance: ModalInstance;
  options: ModalOptions;
  priority?: number;
}

// 上下文类型
export interface ModalContextType {
  showModal: (options: ModalOptions) => ModalInstance;
  closeAll: () => void;
  closeLatest: () => void;
  getModals: () => ModalQueueItem[];
}
