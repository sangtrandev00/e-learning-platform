import React from 'react';
import './CourseAccess.scss';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleFormData } from '../../../../../course.slice';
import { RootState } from '../../../../../../../../store/store';
import { AccessStatus } from '../../../../../../../../types/course.type';
const CourseAccess = () => {
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFormData({ ...formData, access: AccessStatus.FREE }));
  };

  return (
    <div className='course-access'>
      <div className='course-access__wrap'>
        <h3 className='course-access__title'>Write a Access for your course</h3>

        <p className='course-access__desc'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-access__input-group'>
          <label htmlFor='' className='course-access__input-label'>
            Your access
          </label>
          <Input
            value={formData.access}
            onChange={handleInputChange}
            className='course-access__input-input'
            placeholder='Your Access'
          />
        </div>
      </div>
    </div>
  );
};

export default CourseAccess;
