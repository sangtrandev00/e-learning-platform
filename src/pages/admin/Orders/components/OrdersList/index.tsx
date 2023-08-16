import { Avatar, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrdersList.scss';
// import { useGetCourseQuery, useGetCoursesQuery } from '../../course.service';
import { DownloadOutlined } from '@ant-design/icons';
import { IOrder } from '../../../../../types/order.type';
interface DataOrderType {
  key: React.Key;
  name: JSX.Element;
  avatar?: string;
  email?: string;
  courses: JSX.Element;
  register: string;
  transaction: JSX.Element;
  amount: string;
  payment: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataOrderType> = [
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

interface OrdersListProps {
  ordersList: IOrder[];
}

const OrdersList: React.FC<OrdersListProps> = (props) => {
  const [open, setOpen] = useState(false);

  const showUserDetail = () => {
    console.log('click');
    setOpen(true);
  };

  const ordersData: DataOrderType[] =
    props.ordersList.map((order) => {
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
        register: order.createdAt || '',
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
    }) || [];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataOrderType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);

    setTableParams({
      pagination
    });
  };

  return (
    <Fragment>
      <div className='users-list'>
        {/* {isFetching && <Skeleton />} */}
        <Table columns={columns} dataSource={ordersData} onChange={onChange} pagination={tableParams.pagination} />
      </div>
    </Fragment>
  );
};

export default OrdersList;
