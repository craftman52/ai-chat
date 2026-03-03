import React from 'react';
import ReactDOM from 'react-dom';
import type { ModalProps } from './Modal';
import { Modal } from './Modal';
import type { ModalOptions, ModalInstance, ModalQueueItem } from './types';

// Modal 服务类（单例模式）
class ModalService {
  private static instance: ModalService;
  private modalInstances: Map<string, ModalInstance> = new Map();
  private queue: ModalQueueItem[] = [];
  private container: HTMLElement;
  private maxCount = 5;
  private counter = 0;

  private constructor() {
    // 创建容器
    this.container = document.createElement('div');
    this.container.id = 'modal-service-container';
    document.body.appendChild(this.container);
  }

  public static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }
    return ModalService.instance;
  }

  // 生成唯一ID
  private generateId(): string {
    return `modal_${Date.now()}_${this.counter++}`;
  }

  // 显示Modal
  public show(options: ModalOptions): ModalInstance {
    const id = this.generateId();

    // 检查队列数量
    if (this.queue.length >= this.maxCount) {
      console.warn(`Modal queue limit reached (${this.maxCount}), closing oldest modal`);
      const oldest = this.queue.shift();
      oldest?.instance.hide();
    }

    // 创建Modal实例
    const instance = this.createModal(id, options);

    // 添加到队列
    this.queue.push({
      id,
      instance,
      options,
      priority: options.zIndex || 1000,
    });

    // 按优先级排序
    this.queue.sort((a, b) => (b.priority || 1000) - (a.priority || 1000));

    return instance;
  }

  // 创建Modal
  private createModal(id: string, options: ModalOptions): ModalInstance {
    const modalProps: ModalProps = {
      ...options,
      visible: true,
      onInstanceReady: (instance) => {
        this.modalInstances.set(id, instance);
      },
      onClose: () => {
        this.destroy(id);
        options.onClose?.();
      },
    };

    // 创建容器
    const modalContainer = document.createElement('div');
    modalContainer.id = id;
    this.container.appendChild(modalContainer);

    // 渲染Modal
    ReactDOM.render(React.createElement(Modal, modalProps), modalContainer);

    // 返回实例方法
    return {
      show: (newOptions?: ModalOptions) => {
        const instance = this.modalInstances.get(id);
        if (instance) {
          if (newOptions) {
            instance.update(newOptions);
          }
          instance.show();
        }
      },
      hide: () => {
        const instance = this.modalInstances.get(id);
        instance?.hide();
      },
      toggle: () => {
        const instance = this.modalInstances.get(id);
        instance?.toggle();
      },
      update: (newOptions: Partial<ModalOptions>) => {
        const instance = this.modalInstances.get(id);
        instance?.update(newOptions);
      },
      destroy: () => {
        this.destroy(id);
      },
      setLoading: (loading: boolean) => {
        const instance = this.modalInstances.get(id);
        instance?.setLoading(loading);
      },
    };
  }

  // 销毁Modal
  private destroy(id: string): void {
    const modalContainer = document.getElementById(id);
    if (modalContainer) {
      ReactDOM.unmountComponentAtNode(modalContainer);
      modalContainer.remove();
    }

    this.modalInstances.delete(id);
    this.queue = this.queue.filter((item) => item.id !== id);
  }

  // 关闭所有Modal
  public closeAll(): void {
    this.queue.forEach((item) => {
      item.instance.hide();
    });
  }

  // 关闭最新的Modal
  public closeLatest(): void {
    const latest = this.queue[this.queue.length - 1];
    latest?.instance.hide();
  }

  // 获取所有Modal
  public getAll(): ModalQueueItem[] {
    return [...this.queue];
  }

  // 配置服务
  public config(config: { maxCount?: number; container?: HTMLElement }): void {
    if (config.maxCount !== undefined) {
      this.maxCount = config.maxCount;
    }
    if (config.container) {
      this.container = config.container;
    }
  }
}

// 导出单例
export const modal = ModalService.getInstance();

// 便捷方法
export const showModal = (options: ModalOptions) => modal.show(options);
export const closeAllModals = () => modal.closeAll();
export const closeLatestModal = () => modal.closeLatest();
