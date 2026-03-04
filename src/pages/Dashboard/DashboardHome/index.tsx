import { Steps } from '@/components/common/Steps';
import React from 'react';
const DashboardHome: React.FC = () => {
  return (
    <div>
      DashboardHome{' '}
      <Steps
        current={2}
        items={[
          { title: '购物车', icon: <span>🛒</span> },
          { title: '确认订单', icon: <span>📝</span> },
          { title: '支付', icon: <span>💰</span> },
        ]}
      />
    </div>
  );
};

export default DashboardHome;
