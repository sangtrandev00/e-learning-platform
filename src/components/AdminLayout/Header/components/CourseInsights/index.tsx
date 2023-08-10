import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';
const CourseInsights = () => {
  const dispatch = useDispatch();

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Course Insights</h3>

        <Button onClick={openCreateCourseHandler}>
          <PlusCircleOutlined />
          Export courses reports
        </Button>
      </Space>
      <Space className='admin-header__notify'></Space>
    </Fragment>
  );
};

export default CourseInsights;
