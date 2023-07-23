import React from 'react';
import './contents.scss';
import { Button, Space } from 'antd';
import AddSection from './components/AddSection';
import SectionItem from './components/SectionItem';
import { useAddSectionMutation, useGetSectionsByCourseIdQuery, useGetSectionsQuery } from '../../course.service';
import { useParams } from 'react-router-dom';
import { ISection } from '../../../../../types/lesson.type';
const CourseContents = () => {
  const { courseId } = useParams();

  console.log('course id: ', courseId);

  const { data, isFetching } = useGetSectionsByCourseIdQuery(courseId || '');

  const [addSection, addSectionResult] = useAddSectionMutation();

  console.log(data);

  const submitHandler = (formData: Omit<ISection, '_id'>) => {
    console.log(formData);

    if (courseId) {
      const data = {
        name: formData.name,
        access: formData.access,
        courseId: courseId,
        description: formData.description
      };
      addSection(data)
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      throw Error('Course id is not exist');
    }
  };

  return (
    <div className='course-contents'>
      <div className='course-contents__wrap'>
        <h2 className='course-contents__create-title'>Start creating your course by adding the first section!</h2>
      </div>
      <div className='course-contents__add-section'>
        <Space>
          <AddSection onSubmit={submitHandler} />
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
