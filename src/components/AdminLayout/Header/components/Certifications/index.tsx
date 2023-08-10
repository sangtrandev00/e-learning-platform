import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';
const Certifications = () => {
  const dispatch = useDispatch();

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Certifications</h3>

        <Button onClick={openCreateCourseHandler}>
          <PlusCircleOutlined />
          Export data
        </Button>
      </Space>
      <Space className='admin-header__notify'></Space>
    </Fragment>
  );
};

export default Certifications;
