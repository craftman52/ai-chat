import type { User } from './user.types';

// 消息基础类型
export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId?: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: string;
  updatedAt?: string;
  readAt?: string;
  attachments?: MessageAttachment[];
}

// 消息类型枚举
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
  NOTIFICATION = 'notification',
}

// 消息状态枚举
export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

// 消息附件
export interface MessageAttachment {
  id: string;
  url: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  thumbnailUrl?: string;
}

// 带发送者信息的消息
export interface MessageWithSender extends Message {
  sender: User;
}

// 消息会话
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

// 消息列表响应
export interface MessageListResponse {
  messages: Message[];
  total: number;
  page: number;
  pageSize: number;
}
