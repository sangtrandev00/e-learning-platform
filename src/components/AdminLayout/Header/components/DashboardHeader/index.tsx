import { Button, Space } from 'antd';
import React, { Fragment } from 'react';
import { PlusCircleOutlined, BellOutlined, QuestionOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';

const DashboardHeader = () => {
  const dispatch = useDispatch();

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

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
    </Fragment>
  );
};

export default DashboardHeader;
