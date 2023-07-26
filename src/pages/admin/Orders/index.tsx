import React, { useState } from 'react';
import { Space, Input, Select, Button } from 'antd';
import './Orders.scss';
import OrdersList from './components/OrdersList';

import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const Orders = () => {
  const [open, setOpen] = useState(false);

  const onSearchHandler = (value: string) => {
    console.log(value);
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div className='orders'>
      <div className='orders__wrap'>
        <div className='orders__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={() => setOpen(true)} type='primary' icon={<PlusOutlined />}>
              New account
            </Button>
            <Search placeholder='input search text' onSearch={onSearchHandler} style={{ width: 200 }} />
            <Select
              showSearch
              placeholder='Select a person'
              optionFilterProp='children'
              onChange={onSelectChange}
              onSearch={onSelectSearch}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={[
                {
                  value: 'jack',
                  label: 'Jack'
                },
                {
                  value: 'lucy',
                  label: 'Lucy'
                },
                {
                  value: 'tom',
                  label: 'Tom'
                }
              ]}
            />

            <Select
              size='middle'
              placeholder='Please select'
              defaultValue={['All Categories', 'c12 fdsfds']}
              // onChange={handleChange}
              style={{ width: '100%' }}
              options={[
                {
                  value: 'jack',
                  label: 'Jack'
                },
                {
                  value: 'lucy',
                  label: 'Lucy'
                },
                {
                  value: 'tom',
                  label: 'Tom'
                }
              ]}
            />
            <Select
              size='middle'
              placeholder='Please select'
              defaultValue={['All Authors', 'c12 fdsfds']}
              // onChange={handleChange}
              style={{ width: '100%' }}
              options={[
                {
                  value: 'jack',
                  label: 'Jack'
                },
                {
                  value: 'lucy',
                  label: 'Lucy'
                },
                {
                  value: 'tom',
                  label: 'Tom'
                }
              ]}
            />
          </Space>
        </div>
        <div className='orders__show-result'>
          <span className='orders__show-result-text'>Sales Count: 2</span>
          <span className='orders__show-result-text'>Amount: $26</span>
          <span className='orders__show-result-text'>Taxes: $0</span>
        </div>
        <div className='orders__content'>
          <OrdersList />
        </div>
      </div>
    </div>
  );
};

export default Orders;
