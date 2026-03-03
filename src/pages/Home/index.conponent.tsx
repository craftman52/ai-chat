import React, { useState } from 'react';
import { Modal, useModal, showModal, ModalPosition, ModalSize } from '@/components/common/Modal';
const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div>首页</div>
      <button onClick={() => setVisible(true)}>打开Modal</button>
      {/* <Modal
        visible={visible}
        title="组件式Modal"
        content="这是使用组件方式调用的Modal"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        size={ModalSize.MEDIUM}
        position={ModalPosition.CENTER}
      /> */}
    </>
  );
};

export default Home;
