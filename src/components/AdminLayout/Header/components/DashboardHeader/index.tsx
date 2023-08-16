import { BellOutlined, PlusCircleOutlined, QuestionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Space, notification } from 'antd';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';
import { useGetUserQuery } from '../../../../../pages/admin/Users/user.service';
import { useAdminLogoutMutation } from '../../../../../pages/auth.service';
import { setAdminUnauthenticated } from '../../../../../pages/auth.slice';
import { RootState } from '../../../../../store/store';
const DashboardHeader = () => {
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const [adminLogout, adminLogoutResult] = useAdminLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetUserQuery(adminId, {
    skip: !adminId
  });

  let avatarThumnailUrl = '';

  if (data?.user.avatar) {
    if (data?.user.avatar.startsWith('http')) {
      avatarThumnailUrl = data?.user.avatar;
    } else {
      avatarThumnailUrl = `${BACKEND_URL}/${data?.user.avatar}`;
    }
  }

  const adminLogoutHandler = () => {
    // Logout at db
    adminLogout()
      .unwrap()
      .then((result) => {
        console.log('result: ', result);

        notification.success({
          message: result.message
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });

    navigate('/author-login');
    dispatch(setAdminUnauthenticated());
  };

  const adminInfoItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          {data?.user.name || 'Admin author Name'}
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          2nd menu item
        </a>
      )
    },
    {
      key: 'logout',
      label: <a onClick={adminLogoutHandler}>Logout</a>
    }
  ];

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Dashboard</h3>

        <Button onClick={openCreateCourseHandler}>
          <PlusCircleOutlined />
          Create Course
        </Button>
        <Button>
          <PlusCircleOutlined />
          Preview Hompage
        </Button>
        <Button>
          <PlusCircleOutlined />
          Preview Hompage after login
        </Button>
      </Space>
      <Space className='admin-header__notify'>
        <Button>
          <BellOutlined />
          <span>What's new</span>
        </Button>
        <Button>
          <QuestionOutlined />
          <span>Help</span>
        </Button>
        <Dropdown menu={{ items: adminInfoItems }} placement='bottom' arrow>
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} src={avatarThumnailUrl} />
        </Dropdown>
      </Space>
    </Fragment>
  );
};

export default DashboardHeader;
