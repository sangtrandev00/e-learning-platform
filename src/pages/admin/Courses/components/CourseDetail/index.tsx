import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React from 'react';
import Dashboard from '../../../Dashboard';
import Settings from '../../../Settings';
import Access from '../Access';
import CourseContents from '../Contents';
import CourseDetailLayout from '../Layout';
import Pricing from '../Pricing';
import './CourseDetail.scss';
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: 'layout',
    label: `Layout`,
    children: <CourseDetailLayout />
  },
  {
    key: 'contents',
    label: `Contents`,
    children: <CourseContents />
  },
  {
    key: 'access',
    label: `Access`,
    children: <Access />
  },
  {
    key: 'pricing',
    label: `Pricing`,
    children: <Pricing />
  },
  {
    key: 'settings',
    label: `Settings`,
    children: <Settings />
  },
  {
    key: 'dashboard',
    label: `Dashboard`,
    children: <Dashboard />
  }
];

const CourseDetail: React.FC = () => (
  <div className='admin-course-detail'>
    <Tabs
      defaultActiveKey='contents'
      className='admin-course-detail__tabs'
      centered
      items={items}
      onChange={onChange}
    />
  </div>
);

export default CourseDetail;
