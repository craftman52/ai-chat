// 导出组件
export { Modal } from './Modal';
export type { ModalProps } from './Modal';

// 导出Hook
export { useModal } from './useModal';

// 导出服务
export { modal, showModal, closeAllModals, closeLatestModal } from './modal.service';

// 导出类型
export * from './types';

// 默认导出（组件）
import { Modal } from './Modal';
export default Modal;
