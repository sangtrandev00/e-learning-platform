import { Button, Space } from 'antd';
import { Fragment } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

const UsersHeader = () => {
  return (
    <Fragment>
      <Space>
        {/* <Button
      type='text'
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64
      }}
    /> */}
        <h3 className='admin-header__page-title'>Dashboard</h3>

        <Button>
          <PlusCircleOutlined />
          Add User
        </Button>
        <Button>
          <PlusCircleOutlined />
          Preview Hompage
        </Button>
        <Button>
          <PlusCircleOutlined />
          Preview Hompage after login
        </Button>
      </Space>
    </Fragment>
  );
};

export default UsersHeader;
