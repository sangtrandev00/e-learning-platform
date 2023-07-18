import React from 'react';
import './CoursePrice.scss';
import { Input, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleFormData } from '../../../../../course.slice';
import { RootState } from '../../../../../../../../store/store';
const CoursePrice = () => {
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();
  const handleInputChange = (value: number) => {
    dispatch(handleFormData({ ...formData, finalPrice: value }));
  };

  return (
    <div className='course-price'>
      <div className='course-price__wrap'>
        <h3 className='course-price__title'>Write a number for your price</h3>

        <p className='course-price__desc'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-price__input-group'>
          <label htmlFor='' className='course-price__input-label'>
            Your final Price
          </label>
          <InputNumber
            min={1}
            max={200}
            value={formData.finalPrice}
            onChange={handleInputChange}
            className='course-price__input-input'
            placeholder='Price'
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePrice;
