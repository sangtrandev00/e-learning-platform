import React from 'react';
import { Space, Input, Select, Button } from 'antd';
import './Users.scss';
import UsersList from './components/UsersList';

const { Search } = Input;

const Users = () => {
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
    <div className='users'>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
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
        <div className='users__show-result'></div>
        <div className='users__content'>
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default Users;
