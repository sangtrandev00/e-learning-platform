import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CourseDetailLayout from '../Layout';
import CourseContents from '../Contents';
import Pricing from '../Pricing';
import Access from '../Access';
import Settings from '../../../Settings';
import Dashboard from '../../../Dashboard';
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
    <Tabs className='admin-course-detail__tabs' centered defaultActiveKey='layout' items={items} onChange={onChange} />
  </div>
);

export default CourseDetail;
