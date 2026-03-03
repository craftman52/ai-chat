import React, { useState } from 'react';
import ChatList from '@/pages/ChatList';
import ChatDetail from '@/pages/ChatDetail';
import type { User, Conversation } from '@/types/chat';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'list' | 'chat'>('list');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // 模拟当前用户
  const currentUser: User = {
    id: '1',
    nickname: '我',
    avatar: 'https://example.com/my-avatar.jpg',
  };

  // 模拟其他用户
  const otherUsers: User[] = [
    {
      id: '2',
      nickname: '张三',
      avatar: 'https://example.com/avatar1.jpg',
    },
    {
      id: '3',
      nickname: '李四',
      avatar: 'https://example.com/avatar2.jpg',
    },
    {
      id: '4',
      nickname: '王五',
      avatar: 'https://example.com/avatar3.jpg',
    },
  ];

  // 模拟会话列表
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv1',
      user: otherUsers[0],
      lastMessage: {
        id: 'msg1',
        content: '晚上一起吃饭吗？',
        timestamp: Date.now() - 1800000,
        senderId: otherUsers[0].id,
        receiverId: currentUser.id,
        type: 'text',
      },
      unreadCount: 2,
      updatedAt: Date.now() - 1800000,
    },
    {
      id: 'conv2',
      user: otherUsers[1],
      lastMessage: {
        id: 'msg2',
        content: '好的，明天见',
        timestamp: Date.now() - 86400000,
        senderId: currentUser.id,
        receiverId: otherUsers[1].id,
        type: 'text',
      },
      unreadCount: 0,
      updatedAt: Date.now() - 86400000,
    },
    {
      id: 'conv3',
      user: otherUsers[2],
      lastMessage: {
        id: 'msg3',
        content: '文件已经发给你了',
        timestamp: Date.now() - 172800000,
        senderId: otherUsers[2].id,
        receiverId: currentUser.id,
        type: 'text',
      },
      unreadCount: 0,
      updatedAt: Date.now() - 172800000,
    },
  ]);

  // 处理会话点击
  const handleConversationClick = (conversation: Conversation) => {
    // 清空未读计数
    setConversations((prev) =>
      prev.map((c) => (c.id === conversation.id ? { ...c, unreadCount: 0 } : c))
    );
    setSelectedConversation(conversation);
    setCurrentPage('chat');
  };

  // 处理返回列表
  const handleBackToList = () => {
    setCurrentPage('list');
  };

  // 监听浏览器返回
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage('list');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {currentPage === 'list' ? (
        <ChatList
          currentUser={currentUser}
          conversations={conversations}
          onConversationClick={handleConversationClick}
        />
      ) : (
        selectedConversation && (
          <ChatDetail
            conversationId={selectedConversation.id}
            currentUser={currentUser}
            targetUser={selectedConversation.user}
          />
        )
      )}
    </div>
  );
};

export default Home;
