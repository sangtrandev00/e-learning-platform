import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../pages/admin/Courses/course.slice';
import { PlusCircleOutlined, LeftOutlined } from '@ant-design/icons';

const AdminDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const dispatch = useDispatch();
  const openCreateCourseHandler = () => {
    console.log('click');
    dispatch(openCreateCourse(true));
  };

  return (
    <Drawer
      className='drawer'
      title='Basic Drawer'
      placement='right'
      onClose={closeDrawer}
      open={openDrawer}
      mask={false}
      width={200}
    >
      <Button className=''>
        <LeftOutlined />
        Back
      </Button>

      <Button className='' onClick={openCreateCourseHandler}>
        <PlusCircleOutlined />
        Create Course
      </Button>
    </Drawer>
  );
};

export default AdminDrawer;
