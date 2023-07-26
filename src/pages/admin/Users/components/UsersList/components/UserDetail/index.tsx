import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = (props) => {
  return (
    <>
      <Drawer
        title={`Drawer`}
        placement='right'
        size={'large'}
        width={800}
        onClose={props.onClose}
        open={props.isOpen}
        extra={
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button type='primary' onClick={props.onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default UserDetail;
