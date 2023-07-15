import { Breadcrumb } from 'antd';
import React, { Fragment } from 'react';

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
        <Breadcrumb.Item>Big Daddy</Breadcrumb.Item>
      </Breadcrumb>
    </Fragment>
  );
};

export default Dashboard;
