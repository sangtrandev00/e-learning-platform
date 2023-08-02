import React, { Fragment, useEffect } from 'react';
import { Button, Popover, Skeleton, Space, Table } from 'antd';
import type { ColumnsType, TableProps, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import './CategoriesList.scss';
// import { useGetCourseQuery, useGetCoursesQuery } from '../../course.service';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ICategory } from '../../../../../types/category.type';
import type { MenuProps } from 'antd';
import { useDispatch } from 'react-redux';
import { startEditCategory } from '../../category.slice';
import Link from 'antd/es/typography/Link';
import { useDeleteCategoryMutation } from '../../category.service';
interface DataCategoryType {
  key: React.Key;
  name: any;
  courses: number;
  tags: string[];
  createdAt: string; // Convert to date: Example: 18 jun 2023
  description: string;
  actions?: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataCategoryType> = [
  {
    title: 'Category',
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
    title: 'Description',
    dataIndex: 'description'
    // sorter: (a, b) => Number(a.author) - Number(b.author)
  },
  {
    title: 'Created at',
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
    dataIndex: 'actions'
  }
];

const onChange: TableProps<DataCategoryType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface CategoryListProps {
  data: ICategory[];
  onCateEdit: (cateId: string) => void;
}
const SettingContent = (cateId: string) => {
  const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();

  const deleteCateHandler = () => {
    console.log(cateId);

    deleteCategory(cateId)
      .unwrap()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  return (
    <div>
      <p>Content</p>
      <Link onClick={deleteCateHandler}>Delete</Link>
    </div>
  );
};

const CategoriesList: React.FC<CategoryListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //   const showUserDetail = () => {
  //     console.log('click');
  //     setOpen(true);
  //   };

  const cateEditHandler = (cateId: string) => {
    props.onCateEdit(cateId);
    dispatch(startEditCategory(cateId));
  };

  const categoriesSource = props.data.map((cateItem) => {
    const { _id, name, cateImage, cateSlug, description, createdAt, courses } = cateItem;

    const categoryTemplateItem: DataCategoryType = {
      key: _id,
      name: (
        <a href='#'>
          <div className='category-info'>
            <img alt='' src={cateImage} className='category-info__avatar' />

            <div className='category-info__content'>
              <div className='category-info__name'>{name}</div>
            </div>
          </div>
        </a>
      ),
      description: description,
      createdAt: createdAt || '',
      courses: courses || 0,
      tags: ['23432k', 'dsfdjsk'],
      actions: (
        <Space>
          <Button onClick={() => cateEditHandler(_id)}>
            <EditOutlined />
          </Button>
          <Popover placement='bottomRight' content={SettingContent(_id)} title='Actions'>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Popover>
        </Space>
      )
    };

    return categoryTemplateItem;
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  return (
    <div className='users-list'>
      {/* {isFetching && <Skeleton />} */}
      <Table columns={columns} dataSource={categoriesSource} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CategoriesList;
