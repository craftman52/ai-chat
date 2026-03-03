import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Avatar } from 'antd-mobile';
import { PictureOutline, SmileOutline, AddOutline } from 'antd-mobile-icons';
import Layout from '../../components/layout';
import type { Message, ChatPageProps } from '../../types/chat';
import styles from './styles.module.css';

const ChatDetail: React.FC<ChatPageProps> = ({ conversationId, currentUser, targetUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 模拟初始化消息
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        content: '你好！',
        timestamp: Date.now() - 3600000,
        senderId: targetUser.id,
        receiverId: currentUser.id,
        type: 'text',
        status: 'read',
      },
      {
        id: '2',
        content: '在吗？',
        timestamp: Date.now() - 1800000,
        senderId: targetUser.id,
        receiverId: currentUser.id,
        type: 'text',
        status: 'read',
      },
    ];
    setMessages(mockMessages);
  }, [conversationId, currentUser.id, targetUser.id]);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: Date.now(),
      senderId: currentUser.id,
      receiverId: targetUser.id,
      type: 'text',
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // 模拟对方回复
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '收到你的消息了！',
        timestamp: Date.now(),
        senderId: targetUser.id,
        receiverId: currentUser.id,
        type: 'text',
        status: 'sent',
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  // 处理键盘事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout title={targetUser.nickname} showBack onBack={() => window.history.back()}>
      <div className={styles.chatContainer}>
        {/* 消息列表 */}
        <div className={styles.messageList}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.senderId === currentUser.id ? styles.ownMessage : styles.otherMessage
              }`}
            >
              {message.senderId !== currentUser.id && (
                <Avatar src={targetUser.avatar} className={styles.messageAvatar}>
                  {targetUser.nickname[0]}
                </Avatar>
              )}
              <div className={styles.messageContent}>
                <div className={styles.messageBubble}>{message.content}</div>
                <div className={styles.messageMeta}>
                  {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {message.senderId === currentUser.id && message.status === 'sent' && ' ✓'}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className={styles.inputArea}>
          <AddOutline className={styles.inputIcon} />
          <div className={styles.inputWrapper}>
            <Input
              ref={inputRef}
              placeholder="输入消息"
              value={inputValue}
              onChange={(val) => setInputValue(val)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />
            <SmileOutline className={styles.inputIcon} />
            <PictureOutline className={styles.inputIcon} />
          </div>
          <Button color="primary" size="mini" onClick={sendMessage} className={styles.sendButton}>
            发送
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
