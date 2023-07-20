import React from 'react';
import './contents.scss';
import { Button, Space } from 'antd';
import AddSection from './components/AddSection';
import SectionItem from './components/SectionItem';
const CourseContents = () => {
  return (
    <div className='course-contents'>
      <div className='course-contents__wrap'>
        <h2>Start creating your course by adding the first section!</h2>
      </div>
      <div className='course-contents__add-section'>
        <Space>
          <AddSection />
          or
          <Button type='primary'>Import section</Button>
        </Space>
      </div>
      <div className='course-contents__list'>
        <SectionItem />
        <SectionItem />
      </div>
    </div>
  );
};

export default CourseContents;
