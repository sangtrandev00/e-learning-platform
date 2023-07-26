import React, { Fragment, useEffect } from 'react';
import { Avatar, Button, Skeleton, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType, TableProps, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import './OrdersList.scss';
import { Link, useNavigate } from 'react-router-dom';
// import { useGetCourseQuery, useGetCoursesQuery } from '../../course.service';
import { EditOutlined, EllipsisOutlined, UserOutlined, AntDesignOutlined, DownloadOutlined } from '@ant-design/icons';
import { useGetOrdersQuery } from '../../order.service';
interface DataUserType {
  key: React.Key;
  name: HTMLElement;
  avatar?: string;
  email?: string;
  courses: HTMLElement;
  register: string;
  transaction: HTMLElement;
  amount: string;
  payment: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataUserType> = [
  {
    title: 'Learners',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe'
      },
      {
        text: 'Category 1',
        value: 'Category 1'
      },
      {
        text: 'Category 2',
        value: 'Category 2'
      }
    ],
    filterMode: 'tree',
    filterSearch: true,
    // onFilter: (value: string | number | boolean, record) => record.name.startsWith(value.toString()),
    width: '30%'
  },
  {
    title: 'Register',
    dataIndex: 'register'
    // sorter: (a, b) => Number(a.author) - Number(b.author)
  },
  {
    title: 'Courses',
    dataIndex: 'courses'
  },
  {
    title: 'Invoice / Transaction ID',
    dataIndex: 'transaction'
  },
  {
    title: 'Amount',
    dataIndex: 'amount'
  },
  {
    title: 'Payment Gateway',
    dataIndex: 'payment'
  }
];

const onChange: TableProps<DataUserType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const OrdersList: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { data, isFetching } = useGetOrdersQuery();

  const showUserDetail = () => {
    console.log('click');
    setOpen(true);
  };

  const ordersData = data?.orders.map((order) => {
    const { transaction, user, _id, totalPrice, items } = order;

    const orderTemplateItem = {
      key: order._id,
      name: (
        <a href='#' onClick={showUserDetail}>
          <div className='user-info'>
            <img alt={user.name} src={user.avatar || ''} className='user-info__avatar' />

            <div className='user-info__content'>
              <div className='user-info__name'>{user.name}</div>
              <div className='user-info__email'>{user.email}</div>
            </div>
          </div>
        </a>
      ),
      register: '19 Jul 2023 21:43:35',

      courses: (
        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {(items || []).map((course) => (
            <Avatar src={course.thumbnail} />
          ))}
          {/* <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar> */}
          <Tooltip title='Courses' placement='top'>
            {(items || []).map((course) => (
              <Avatar src={course.thumbnail} />
            ))}
          </Tooltip>
          {/* <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} /> */}
        </Avatar.Group>
      ),
      transaction: (
        <>
          <div>
            <Link to='/'>
              Invoice <DownloadOutlined />
            </Link>
          </div>
          <div>sandbox_64bccb1fc177e</div>
        </>
      ),
      amount: `$${totalPrice}`,
      payment: transaction.method
    };

    return orderTemplateItem;
  });

  const ordersSource = [
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
      register: '19 Jul 2023 21:43:35',
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
      transaction: (
        <>
          <div>
            <Link to='/'>
              Invoice <DownloadOutlined />
            </Link>
          </div>
          <div>sandbox_64bccb1fc177e</div>
        </>
      ),
      amount: `$16`,
      payment: 'sandbox'
    },
    {
      key: '2',
      name: (
        <a href='#'>
          <div className='user-info'>
            <img
              alt=''
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
      register: '19 Jul 2023 21:43:35',
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
      transaction: (
        <>
          <div>
            <Link to='/'>
              Invoice <DownloadOutlined />
            </Link>
          </div>
          <div>sandbox_64bccb1fc177e</div>
        </>
      ),
      amount: `$16`,
      payment: 'VNPAY'
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
          <Table columns={columns} dataSource={ordersData} onChange={onChange} pagination={tableParams.pagination} />
        </div>
      )}
    </Fragment>
  );
};

export default OrdersList;
