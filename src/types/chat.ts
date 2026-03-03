// 用户类型
import type React from 'react';
export interface User {
  id: string;
  nickname: string;
  avatar?: string;
}

// 聊天消息类型
export interface Message {
  id: string;
  content: string;
  timestamp: number;
  senderId: string;
  receiverId: string;
  type: 'text' | 'image' | 'system';
  status?: 'sending' | 'sent' | 'read';
}

// 会话类型
export interface Conversation {
  id: string;
  user: User;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: number;
}

// 布局组件的 Props 类型
export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

// 聊天页 Props 类型
export interface ChatPageProps {
  conversationId: string;
  currentUser: User;
  targetUser: User;
}

// 聊天列表页 Props 类型
export interface ChatListPageProps {
  currentUser: User;
  conversations: Conversation[];
  onConversationClick: (conversation: Conversation) => void;
}
