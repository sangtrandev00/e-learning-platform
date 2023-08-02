import { Button, Input, Select, Skeleton, Space } from 'antd';
import CreateCategory from './components/CreateCategory';
import CategoriesList from './components/CategoriesList';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useAddCategoryMutation, useGetCategoriesQuery } from './category.service';
import { ICategory } from '../../../types/category.type';
import { set } from 'date-fns';
import { useDispatch } from 'react-redux';
import { startEditCategory } from './category.slice';

const { Search } = Input;

const Categories = () => {
  const { data, isFetching } = useGetCategoriesQuery();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onSearchHandler = (value: string) => {
    console.log(value);
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  const cateEditHandler = (cateId: string) => {
    setOpen(true);
  };

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const newCategoryHandler = () => {
    dispatch(startEditCategory(''));
    setOpen(true);
  };

  return (
    <div className='categories'>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newCategoryHandler} type='primary' icon={<PlusOutlined />}>
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
          {isFetching ? <Skeleton /> : <CategoriesList onCateEdit={cateEditHandler} data={data?.categories || []} />}
        </div>
      </div>
      {/* isOpen={open} onClose={() => setOpen(false)} */}
      <CreateCategory isOpen={open} onClose={closeDrawerHandler} />
    </div>
  );
};

export default Categories;
