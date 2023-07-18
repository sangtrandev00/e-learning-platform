import { Input } from 'antd';
import './CourseTitle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/store';
import { handleFormData } from '../../../../../course.slice';

const CourseTitle = () => {
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFormData({ ...formData, name: e.target.value }));
  };

  return (
    <div className='course-title'>
      <div className='course-title__wrap'>
        <h3 className='course-title__title'>Write a title for your course</h3>

        <p className='course-title__desc'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-title__input-group'>
          <label htmlFor='' className='course-title__input-label'>
            Your title
          </label>
          <Input
            value={formData.name}
            onChange={handleInputChange}
            className='course-title__input-input'
            placeholder='Basic usage'
          />
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
