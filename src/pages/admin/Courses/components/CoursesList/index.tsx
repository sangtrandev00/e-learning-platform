import React, { Fragment, useEffect } from 'react';
import { Button, Skeleton, Table } from 'antd';
import type { ColumnsType, TableProps, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import './CoursesList.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCourseQuery, useGetCoursesQuery } from '../../course.service';

enum Access {
  PAID = 'PAID',
  FREE = 'FREE',
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

interface DataCourseType {
  key: React.Key;
  name: any;
  author: string;
  categories: string;
  access: Access;
  finalPrice: number;
  price: number;
  learners: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  updatedAt: string;
  actions?: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataCourseType> = [
  {
    title: 'Name',
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
    title: 'Author',
    dataIndex: 'author',
    sorter: (a, b) => Number(a.author) - Number(b.author)
  },
  {
    title: 'Categories',
    dataIndex: 'categories',
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
    onFilter: (value: string | number | boolean, record) => record.categories.startsWith(value.toString()),
    filterSearch: true
  },
  {
    title: 'Access',
    dataIndex: 'access'
  },
  {
    title: 'Final Price',
    dataIndex: 'finalPrice'
  },
  {
    title: 'Price (before discount)',
    dataIndex: 'price'
  },
  {
    title: 'Learners',
    dataIndex: 'learners'
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt'
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt'
  },
  {
    title: 'Action',
    dataIndex: 'actions'
  }
];

const onChange: TableProps<DataCourseType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const CoursesList: React.FC = () => {
  const { data: dataList, isFetching } = useGetCoursesQuery();

  if (dataList) {
    console.log(dataList, isFetching);
  }

  const [courseData, setCourseData] = useState<DataCourseType[]>();

  useEffect(() => {
    if (dataList) {
      const sourceCourseData = dataList.courses.map((courseItem) => {
        const {
          _id,
          name,
          description,
          price,
          finalPrice,
          access,
          level,
          thumbnail,
          categoryId,
          userId,
          createdAt,
          updatedAt
        } = courseItem;

        const courseTemplateItem: DataCourseType = {
          key: `${_id}`,
          name: (
            <div className='table__col-name'>
              <img title={name} className='table__col-name-img' src={thumbnail} />
              <span className='table__col-name-text'>{name}</span>
            </div>
          ),
          author: userId,
          categories: categoryId,
          access: Access.FREE,
          finalPrice: finalPrice,
          price: price,
          learners: 10,
          createdAt: '18 jun 2023',
          updatedAt: '18 jun 2023',
          actions: (
            <Fragment>
              <Button>
                <Link to={`/author/courses?courseid=${_id}`}>Edit</Link>
              </Button>
              <Button>Some actions</Button>
            </Fragment>
          )
        };
        return courseTemplateItem;
      });

      setCourseData(sourceCourseData);
    } else {
      setCourseData([]);
    }
  }, [dataList]);

  const data: DataCourseType[] = [
    {
      key: '1',
      name: (
        <div className='table__col-name'>
          <img
            title='img'
            className='table__col-name-img'
            src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/custom/400x0_7443fad7314a484dffc9daff76f35cde.jpeg'
          />
          <span className='table__col-name-text'>HTML, CSS</span>
        </div>
      ),
      author: 'Sang tran dev',
      categories: 'Programming',
      access: Access.FREE,
      finalPrice: 100,
      price: 120,
      learners: 10,
      createdAt: '18 jun 2023',
      updatedAt: '18 jun 2023',
      actions: (
        <Fragment>
          <Button>
            <Link to={'/author/courses?courseid=1'}>Edit</Link>
          </Button>
          <Button>Some actions</Button>
        </Fragment>
      )
    },
    {
      key: '2',
      name: 'Javascript',
      author: 'Sang tran dev',
      categories: 'Programming',
      access: Access.FREE,
      finalPrice: 100,
      price: 120,
      learners: 10,
      createdAt: '18 jun 2023',
      updatedAt: '18 jun 2023'
    },
    {
      key: '3',
      name: 'ReactJS',
      author: 'Sang tran dev',
      categories: 'Programming',
      access: Access.FREE,
      finalPrice: 100,
      price: 120,
      learners: 10,
      createdAt: '18 jun 2023',
      updatedAt: '18 jun 2023'
    },
    {
      key: '4',
      name: 'Typescript',
      author: 'Sang tran dev',
      categories: 'Programming',
      access: Access.PAID,
      finalPrice: 100,
      price: 120,
      learners: 10,
      createdAt: '18 jun 2023',
      updatedAt: '18 jun 2023'
    }
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  return (
    <div className="course-list">
      {isFetching && <Skeleton />}
      <Table columns={columns} dataSource={courseData} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CoursesList;
