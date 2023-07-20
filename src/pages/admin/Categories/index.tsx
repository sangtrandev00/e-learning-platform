import { Button, Input, Select, Space } from 'antd';
import CreateCategory from './components/CreateCategory';
import CategoriesList from './components/CategoriesList';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
const { Search } = Input;

const Categories = () => {
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
    <div className='categories'>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={() => setOpen(true)} type='primary' icon={<PlusOutlined />}>
              New Category
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
        <div className='users__show-result'></div>
        <div className='users__content'>
          <CategoriesList />
        </div>
      </div>
      {/* isOpen={open} onClose={() => setOpen(false)} */}
      <CreateCategory isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Categories;
