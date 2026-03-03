import React from 'react';
import { NavBar } from 'antd-mobile';
import { SearchOutline, AddOutline } from 'antd-mobile-icons';
import type { LayoutProps } from '../../types/chat';
import styles from './styles.module.css';

const Layout: React.FC<LayoutProps> = ({
  children,
  title = '微信',
  showBack = false,
  onBack,
  rightAction,
}) => {
  return (
    <div className={styles.container}>
      <NavBar
        back={showBack ? '返回' : undefined}
        onBack={onBack}
        right={rightAction}
        className={styles.navbar}
      >
        {title}
      </NavBar>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

// 带搜索栏的聊天列表布局
export const ChatListLayout: React.FC<Omit<LayoutProps, 'rightAction'>> = (props) => {
  return (
    <Layout
      {...props}
      rightAction={
        <div className={styles.rightActions}>
          <SearchOutline className={styles.actionIcon} />
          <AddOutline className={styles.actionIcon} />
        </div>
      }
    />
  );
};

export default Layout;
