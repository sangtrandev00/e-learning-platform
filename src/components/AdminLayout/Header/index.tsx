import React, { useState } from 'react';
import { Button, Layout, Space, theme } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleOutlined,
  LeftOutlined,
  BellOutlined,
  QuestionOutlined
} from '@ant-design/icons';
import { openCreateCourse } from '../../../pages/admin/Courses/course.slice';
import { useDispatch } from 'react-redux';
import './Header.scss';
const { Header } = Layout;
const AdminHeader = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const dispatch = useDispatch();

  const openCreateCourseHandler = () => {
    console.log('click');

    dispatch(openCreateCourse(true));
  };

  return (
    <Header className='admin-header' style={{ padding: 0, background: colorBgContainer }}>
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

        <Button onClick={openCreateCourseHandler}>
          <PlusCircleOutlined />
          Create Course
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
      <Space className='admin-header__notify'>
        <Button>
          <BellOutlined />
          <span>What's new</span>
        </Button>
        <Button>
          <QuestionOutlined />
          <span>Help</span>
        </Button>
      </Space>
    </Header>
  );
};

export default AdminHeader;
