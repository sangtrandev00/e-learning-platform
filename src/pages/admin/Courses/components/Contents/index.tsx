import React from 'react';
import './contents.scss';
import { Button, Space, notification } from 'antd';
import AddSection from './components/AddSection';
import SectionItem from './components/SectionItem';
import { useAddSectionMutation, useGetSectionsByCourseIdQuery, useGetSectionsQuery } from '../../course.service';
import { useParams } from 'react-router-dom';

const CourseContents = () => {
  const { courseId } = useParams();
  const { data, isFetching } = useGetSectionsByCourseIdQuery(courseId || '');

  return (
    <div className='course-contents'>
      <div className='course-contents__wrap'>
        <h2 className='course-contents__create-title'>Start creating your course by adding the first section!</h2>
      </div>
      <div className='course-contents__add-section'>
        <Space>
          <AddSection courseId={courseId as string} />
          or
          <Button type='primary'>Import section</Button>
        </Space>
      </div>
      <div className='course-contents__list'>
        {data?.sections.map((section, index) => {
          return <SectionItem key={section._id} section={section} index={index} />;
        })}

        {/* <SectionItem />
        <SectionItem /> */}
      </div>
    </div>
  );
};

export default CourseContents;
