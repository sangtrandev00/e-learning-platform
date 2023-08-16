import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Users.scss';
import AddUser from './components/AddUser';
import UsersList from './components/UsersList';
import { startEditUser } from './user.slice';

const { Search } = Input;

const Users = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const onSearchHandler = (value: string) => {
    console.log(value);

    setSearchValue(value);
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  const createUserHandler = () => {
    setOpen(true);
    dispatch(startEditUser(''));
  };

  return (
    <div className='users'>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={createUserHandler} type='primary' icon={<PlusOutlined />}>
              New User
            </Button>
            <Search placeholder='Search Name of User' onSearch={onSearchHandler} style={{ width: 200 }} />
            <Select
              showSearch
              placeholder='Search by course'
              optionFilterProp='children'
              onChange={onSelectChange}
              onSearch={onSelectSearch}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={[
                {
                  value: 'Course: HTML CSS',
                  label: 'Course: HTML CSS'
                },
                {
                  value: 'Course: Javascript',
                  label: 'Course: Javascript'
                },
                {
                  value: 'Course: Reactjs',
                  label: 'Course: Reactjs'
                }
              ]}
            />

            <Select
              size='middle'
              placeholder='Date'
              defaultValue={['All dates']}
              // onChange={handleChange}
              style={{ width: '20rem' }}
              options={[
                {
                  value: 'jack',
                  label: 'New Users today'
                },
                {
                  value: 'lucy',
                  label: 'New Users Yesterdays day'
                },
                {
                  value: 'New Users the last 7 days',
                  label: 'New Users the last 7 days'
                },
                {
                  value: 'New Users the last 30 days',
                  label: 'New Users the last 30 days'
                },
                {
                  value: 'jack',
                  label: 'Active users today'
                },
                {
                  value: 'lucy',
                  label: 'Active users Yesterdays day'
                },
                {
                  value: 'Active users the last 7 days',
                  label: 'Active users the last 7 days'
                },
                {
                  value: 'Active users the last 30 days',
                  label: 'Active users the last 30 days'
                }
              ]}
            />
            <Select
              size='middle'
              placeholder='Role'
              defaultValue={['All Roles']}
              // onChange={handleChange}
              style={{ width: '10rem' }}
              options={[
                {
                  value: 'Users',
                  label: 'Users'
                },
                {
                  value: 'Admins',
                  label: 'Admins'
                },
                {
                  value: 'Teachers',
                  label: 'Teachers'
                }
              ]}
            />

            <Select
              size='middle'
              placeholder='Status'
              defaultValue={['Status']}
              // onChange={handleChange}
              style={{ width: '15rem' }}
              options={[
                {
                  value: 'Suspending',
                  label: 'Suspending'
                },
                {
                  value: 'Active',
                  label: 'Active'
                },
                {
                  value: 'Paying',
                  label: 'Paying'
                }
              ]}
            />
          </Space>
        </div>
        <div className='users__show-result'></div>
        <div className='users__content'>
          <UsersList searchValue={searchValue} onEditUser={() => setOpen(true)} />
        </div>
      </div>
      <AddUser isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Users;
