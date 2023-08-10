import { Input, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import './Orders.scss';
import OrdersList from './components/OrdersList';

import { useGetCoursesQuery } from '../Courses/course.service';
import { useGetOrdersQuery } from './order.service';

const { Search } = Input;

const Orders = () => {
  const [open, setOpen] = useState(false);

  const [ordersParams, setOrdersParams] = useState({
    courseId: '',
    date: '',
    searchText: ''
  });

  const { data, isFetching } = useGetOrdersQuery(ordersParams);

  const params = {};

  const { data: coursesData } = useGetCoursesQuery(params);

  const filterCoursesList = coursesData?.courses.map((course) => {
    return {
      label: `[course]: ${course.name}`,
      value: course._id
    };
  });

  filterCoursesList?.unshift({
    label: 'All Products',
    value: 'all'
  });

  console.log(open);

  const onSearchHandler = (value: string) => {
    console.log(value);

    setOrdersParams({
      ...ordersParams,
      searchText: value
    });
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const orderDateFilterChange = (value: string) => {
    console.log('value: ', value);

    setOrdersParams({
      ...ordersParams,
      date: value
    });
  };

  const filterProductsChange = (value: string) => {
    console.log('change: ', value);

    setOrdersParams({
      ...ordersParams,
      courseId: value
    });
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div className='orders'>
      <div className='orders__wrap'>
        <div className='orders__filter'>
          <Space className='sub-header__wrap'>
            {/* <Button onClick={() => setOpen(true)} type='primary' icon={<PlusOutlined />}>
              New account
            </Button> */}
            <Search placeholder='input search text' onSearch={onSearchHandler} style={{ width: 200 }} />

            <Select
              size='middle'
              placeholder='Please select all products'
              defaultValue={'All Products'}
              onChange={filterProductsChange}
              style={{ width: '360px' }}
              options={filterCoursesList}
            />
            <Select
              size='middle'
              placeholder='All Dates'
              defaultValue={'All dates'}
              onChange={orderDateFilterChange}
              style={{ width: '200px' }}
              options={[
                {
                  value: 'all',
                  label: 'All dates'
                },
                {
                  value: 'today',
                  label: 'Today'
                },
                {
                  value: 'yesterday',
                  label: 'yesterday'
                },
                {
                  value: '7days',
                  label: 'Last 7 days'
                },
                {
                  value: '30days',
                  label: 'Last 30 days'
                }
              ]}
            />
          </Space>
        </div>
        <div className='orders__show-result'>
          <span className='orders__show-result-text'>Sales Count: {data?.count || 0}</span>
          <span className='orders__show-result-text'>Amount: ${data?.total || 0}</span>
          <span className='orders__show-result-text'>Taxes: $0</span>
        </div>
        <div className='orders__content'>
          {isFetching && <Skeleton />}
          {!isFetching && <OrdersList ordersList={data?.orders || []} />}
        </div>
      </div>
    </div>
  );
};

export default Orders;
