import { Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/store';
import { handleFormData } from '../../../../../course.slice';
import './CourseThumb.scss';
const CourseThumb = () => {
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  return (
    <div className='course-thumb'>
      <div className='course-thumb__wrap px-8'>
        <h3 className='course-thumb__title'>Write a Thumb for your course</h3>

        <p className='course-thumb__desc font-normal'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-thumb__input-group'>
          <label htmlFor='' className='course-thumb__input-label'>
            Your thumb
          </label>
          <Input
            value={formData.thumbnail}
            name='thumbnail'
            onChange={handleInputChange}
            className='course-thumb__input-input'
            placeholder='Your Thumbnail URL'
          />
        </div>
      </div>
      <div className='course-desc__wrap px-8 mt-8'>
        <h3 className='course-desc__title'>Write a description for your course</h3>

        <p className='course-desc__desc font-normal'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-desc__input-group'>
          <label htmlFor='' className='course-desc__input-label'>
            Your description
          </label>
          <Input
            value={formData.description}
            onChange={handleInputChange}
            name='description'
            className='course-desc__input-input'
            placeholder='Your Desc'
          />
        </div>
      </div>
    </div>
  );
};

export default CourseThumb;
