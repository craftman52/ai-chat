import React from 'react';
import { List, Avatar, Badge } from 'antd-mobile';
import type { ChatListPageProps } from '../../types/chat';
import { ChatListLayout } from '@/components/layout';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import styles from './styles.module.css';

const ChatList: React.FC<ChatListPageProps> = ({
  currentUser,
  conversations,
  onConversationClick,
}) => {
  // 格式化时间
  const formatTime = (timestamp: number) => {
    try {
      return formatDistanceToNow(timestamp, {
        addSuffix: true,
        locale: zhCN,
      });
    } catch {
      return '';
    }
  };

  return (
    <ChatListLayout title="微信">
      <List className={styles.list}>
        {conversations.map((conversation) => (
          <List.Item
            key={conversation.id}
            prefix={
              <Badge content={conversation.unreadCount} className={styles.badge}>
                <Avatar src={conversation.user.avatar} className={styles.avatar}>
                  {conversation.user.nickname[0]}
                </Avatar>
              </Badge>
            }
            description={
              <div className={styles.messagePreview}>
                <span className={styles.lastMessage}>
                  {conversation.lastMessage?.content || '暂无消息'}
                </span>
                <span className={styles.time}>
                  {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                </span>
              </div>
            }
            onClick={() => onConversationClick(conversation)}
            className={styles.listItem}
          >
            <div
              className={`${styles.nickname} ${conversation.unreadCount > 0 ? styles.unread : ''}`}
            >
              {conversation.user.nickname}
            </div>
          </List.Item>
        ))}
      </List>
    </ChatListLayout>
  );
};

export default ChatList;
