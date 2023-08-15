import { Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/store';
import { handleFormData } from '../../../../../course.slice';
import './CourseSlug.scss';
const CourseSlug = () => {
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFormData({ ...formData, courseSlug: e.target.value }));
  };

  return (
    <div className='course-slug'>
      <div className='course-slug__wrap'>
        <h3 className='course-slug__title'>Write a slug for your course</h3>

        <p className='course-slug__desc font-normal'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-slug__input-group'>
          <label htmlFor='' className='course-slug__input-label'>
            Your slug
          </label>
          <Input
            value={formData.courseSlug}
            onChange={handleInputChange}
            className='course-slug__input-input'
            placeholder='Your Slug'
          />
        </div>
      </div>
    </div>
  );
};

export default CourseSlug;
