import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Fragment } from 'react';

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
        <h3 className='admin-header__page-title'>Users</h3>

        <Button>
          <PlusCircleOutlined />
          Add User
        </Button>
        <Button>
          <PlusCircleOutlined />
          Bulk actions
        </Button>
        <Button>
          <PlusCircleOutlined />
          Export users report
        </Button>
      </Space>
    </Fragment>
  );
};

export default UsersHeader;
