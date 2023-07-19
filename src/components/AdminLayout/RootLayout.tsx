import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react';
import './RootLayout.scss';
import { Layout } from 'antd';
import CreateCourse from '../../pages/admin/Courses/components/CreateCourse';
import SideBar from './SideBar';
import AdminHeader from './Header';
import AdminDrawer from './Drawer';

const { Content, Footer } = Layout;

const RootAdminLayout: React.FC = () => {
  return (
    <Fragment>
      <Layout style={{ minHeight: '100vh' }} className='admin-layout'>
        {/* SideBar component here */}
        <SideBar />
        <Layout>
          {/* Admin Header here */}
          <AdminHeader />
          {/* Change content here */}
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
          {/* Admin Footer here */}
          <Footer style={{ textAlign: 'center' }}>©2023 Created by Sang Tran Dev</Footer>
        </Layout>
      </Layout>
      {/* Drawer here let change later */}
      <AdminDrawer />
      <CreateCourse />
    </Fragment>
  );
};

export default RootAdminLayout;
