import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllCategoriesQuery, useGetCategoriesQuery } from './category.service';
import { startEditCategory } from './category.slice';
import CategoriesList from './components/CategoriesList';
import CreateCategory from './components/CreateCategory';

const { Search } = Input;

const Categories = () => {
  const [params, setParams] = useState({
    _limit: 12,
    _page: 12,
    _q: '',
    _cateName: ''
  });

  const { data, isFetching } = useGetCategoriesQuery(params);
  const { data: allCateData, isFetching: isAllCateFetching } = useGetAllCategoriesQuery();
  const [open, setOpen] = useState(false);

  const cateFilterList =
    allCateData?.categories.map((cate) => {
      return {
        value: cate.name,
        label: cate.name
      };
    }) || [];

  cateFilterList.unshift({
    value: 'all',
    label: 'All Categories'
  });

  const dispatch = useDispatch();
  const onSearchHandler = (value: string) => {
    console.log(value);

    setParams({ ...params, _q: value });
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

  const cateFilterHandler = (value: string) => {
    console.log('value: ', value);
    setParams({ ...params, _cateName: value });
  };

  return (
    <div className='categories'>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
            <Button onClick={newCategoryHandler} type='primary' icon={<PlusOutlined />}>
              New Category
            </Button>
            <Search placeholder='Search categories' onSearch={onSearchHandler} style={{ width: 200 }} />

            <Select
              size='middle'
              placeholder='Please select your category'
              defaultValue={'All Categories'}
              // onChange={handleChange}
              onChange={cateFilterHandler}
              style={{ width: '240px' }}
              options={cateFilterList}
            />
            {/* Tags filter here */}
            {/* <Select
              size='middle'
              placeholder='Please select'
              defaultValue={['All tags', '']}
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
            /> */}
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
