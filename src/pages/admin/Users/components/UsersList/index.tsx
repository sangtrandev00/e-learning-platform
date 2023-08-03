import React, { Fragment, useEffect } from 'react';
import { Avatar, Button, Popover, Skeleton, Space, Table, Tag, Tooltip, notification } from 'antd';
import type { ColumnsType, TableProps, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import './UsersList.scss';
import { Link, useNavigate } from 'react-router-dom';
// import { useGetCourseQuery, useGetCoursesQuery } from '../../course.service';
import { EditOutlined, EllipsisOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import UserDetail from './components/UserDetail';
import { useDeleteUserMutation, useGetUsersQuery } from '../../user.service';
import { useDispatch } from 'react-redux';
import { startEditUser } from '../../user.slice';
interface DataUserType {
  key: React.Key;
  name: HTMLElement;
  avatar?: string;
  email?: string;
  courses: HTMLElement;
  tags: HTMLElement;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  lastLogin: string;
  actions?: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataUserType> = [
  {
    title: 'User',
    dataIndex: 'name',
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe'
    //   },
    //   {
    //     text: 'Category 1',
    //     value: 'Category 1'
    //   },
    //   {
    //     text: 'Category 2',
    //     value: 'Category 2'
    //   }
    // ],
    // filterMode: 'tree',
    // filterSearch: true,
    // onFilter: (value: string | number | boolean, record) => record.name.startsWith(value.toString()),
    width: '30%'
  },
  {
    title: 'Last login',
    dataIndex: 'lastLogin'
    // sorter: (a, b) => Number(a.author) - Number(b.author)
  },
  {
    title: 'Registerd',
    dataIndex: 'createdAt',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    // onFilter: (value: string | number | boolean, record) => record.categories.startsWith(value.toString()),
    filterSearch: true
  },
  {
    title: 'Courses',
    dataIndex: 'courses'
  },
  {
    title: 'Tags',
    dataIndex: 'tags'
  },
  {
    title: 'Manage',
    dataIndex: 'manage'
  }
];

const SettingContent = (props: { userId: string }) => {
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();

  const deleteUserHandler = () => {
    console.log(props.userId);

    deleteUser(props.userId)
      .unwrap()
      .then((result) => {
        console.log(result);

        notification.success({
          message: 'Delete User successfully',
          description: 'Delete User successfully hihi',
          duration: 2
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  return (
    <div>
      <p>Content</p>
      <a onClick={deleteUserHandler}>Delete</a>
    </div>
  );
};

interface UserListProps {
  onEditUser: () => void;
}

const UsersList: React.FC<UserListProps> = (props) => {
  const [open, setOpen] = useState(false);

  const [usersParams, setUsersParams] = useState({
    _q: ''
  });

  // useEffect(() => {
  //   setUsersParams({
  //     ...usersParams,
  //     _q: ''
  //   });
  // }, []);

  const { data, isFetching } = useGetUsersQuery(usersParams);
  const dispatch = useDispatch();
  const showUserDetail = () => {
    console.log('click');
    setOpen(true);
  };

  const editUserHandler = (userId: string) => {
    // startEditingUser()
    console.log('userid: ', userId);
    dispatch(startEditUser(userId));
    // setOpen(true);
    props.onEditUser();
  };

  const onChange: TableProps<DataUserType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);

    console.log('pagination: ', pagination);

    setTableParams({ pagination: pagination });
  };

  const usersData = data?.users.map((user) => {
    const userTemplateItem = {
      key: user._id,
      name: (
        <a href='#' onClick={showUserDetail}>
          <div className='user-info'>
            <img alt={user.name} src={user.avatar} className='user-info__avatar' />

            <div className='user-info__content'>
              <div className='user-info__name'>{user.name}</div>
              <div className='user-info__email'>{user.email}</div>
            </div>
          </div>
        </a>
      ),
      lastLogin: '19 Jul 2023 21:43:35',
      createdAt: user.createdAt,
      courses: (
        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {(user.courses || []).map((course) => (
            <Avatar key={course._id} src={course.thumbnail} />
          ))}
          {/* <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar> */}
          <Tooltip title='Ant User' placement='top'>
            {(user.courses || []).map((course) => (
              <Avatar key={course._id} src={course.thumbnail} />
            ))}
          </Tooltip>
          {/* <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} /> */}
        </Avatar.Group>
      ),
      tags: (
        <>
          <Tag color='magenta'>magenta</Tag>
          <Tag color='red'>red</Tag>
        </>
      ),
      manage: (
        <Space>
          <Button onClick={() => editUserHandler(user._id)}>
            <EditOutlined />
          </Button>

          <Popover placement='bottomRight' content={<SettingContent userId={user._id} />} title='Actions'>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Popover>
        </Space>
      )
    };

    return userTemplateItem;
  });

  const usersSource = [
    {
      key: '1',
      name: (
        <a href='#' onClick={showUserDetail}>
          <div className='user-info'>
            <img
              src='https://lwfiles.mycourse.app/64b5524f42f5698b2785b91e-public/avatars/thumbs/64b5524f42f5698b2785b91f.jpg'
              className='user-info__avatar'
            />

            <div className='user-info__content'>
              <div className='user-info__name'>sangtrandev</div>
              <div className='user-info__email'>sangtnps20227@fpt.edu.vn</div>
            </div>
          </div>
        </a>
      ),
      lastLogin: '19 Jul 2023 21:43:35',
      createdAt: '17 Jul 2023 21:38:07',
      courses: (
        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Tooltip title='Ant User' placement='top'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Tooltip>
          <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
      ),
      tags: (
        <>
          <Tag color='magenta'>magenta</Tag>
          <Tag color='red'>red</Tag>
        </>
      ),
      manage: (
        <Space>
          <Button>
            <EditOutlined />
          </Button>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Space>
      )
    },
    {
      key: '2',
      name: (
        <a href='#'>
          <div className='user-info'>
            <img
              src='https://lwfiles.mycourse.app/64b5524f42f5698b2785b91e-public/avatars/thumbs/64b5524f42f5698b2785b91f.jpg'
              className='user-info__avatar'
            />

            <div className='user-info__content'>
              <div className='user-info__name'>trannhatsang</div>
              <div className='user-info__email'>nhatsang@gmail.com</div>
            </div>
          </div>
        </a>
      ),
      lastLogin: '19 Jul 2023 21:43:35',
      createdAt: '17 Jul 2023 21:38:07',
      courses: (
        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Tooltip title='Ant User' placement='top'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Tooltip>
          <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
      ),
      tags: (
        <>
          <Tag color='magenta'>magenta</Tag>
          <Tag color='red'>red</Tag>
        </>
      ),
      manage: (
        <Space>
          <Button>
            <EditOutlined />
          </Button>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Space>
      )
    }
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  return (
    <Fragment>
      {isFetching && <Skeleton />}
      {!isFetching && (
        <div className='users-list'>
          {/* {isFetching && <Skeleton />} */}
          <Table columns={columns} dataSource={usersData} onChange={onChange} pagination={tableParams.pagination} />
          <UserDetail isOpen={open} onClose={() => setOpen(false)} />
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
