import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useGetAuthorsQuery } from '../../../../site/client.service';
import { useGetCategoriesQuery } from '../../../Categories/category.service';
import { useGetCoursesQuery } from '../../course.service';
import './CoursesList.scss';

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

interface CoursesListProps {
  courseData: DataCourseType[];
}

const CoursesList: React.FC<CoursesListProps> = (props) => {
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const { data: dataList, isFetching } = useGetCoursesQuery({ _q: '' });
  const { data: categoriesData, isFetching: isCategoriesFetching } = useGetCategoriesQuery({ _q: '' });
  const { data: authorsData, isFetching: isAuthorFetching } = useGetAuthorsQuery();

  if (dataList) {
    console.log(dataList, isFetching);
  }

  const nameFiltersList = dataList?.courses.map((course) => {
    return {
      text: course.name,
      value: course.name
    };
  });
  // const onNameFilter = (value: string, record: DataCourseType) => {
  //   console.log(value, record);

  //   return record.author.includes(value.toString());
  // };

  const cateFilterList = categoriesData?.categories.map((cate) => {
    return {
      text: cate.name,
      value: cate.name
    };
  });

  const authorFilterList = authorsData?.authors.map((author) => {
    return {
      text: author[0],
      value: author[0]
    };
  });

  const ACCESS = ['PAID', 'FREE', 'DRAFT', 'PUBLIC', 'PRIVATE'];

  const accessFilterList = ACCESS.map((access) => {
    return {
      text: access,
      value: access
    };
  });

  const columns: ColumnsType<DataCourseType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      // filters: nameFiltersList,
      // filterMode: 'tree',
      // filterSearch: true,
      // onFilter: onNameFilter,
      width: '20%'
    },
    {
      title: 'Author',
      dataIndex: 'author',
      filters: authorFilterList,
      sorter: (a, b) => a.author.length - b.author.length,
      onFilter: (value: string | number | boolean, record: DataCourseType) => record.author.startsWith(value.toString())
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      filters: cateFilterList,
      onFilter: (value: string | number | boolean, record: DataCourseType) =>
        record.categories.startsWith(value.toString()),
      filterSearch: true
    },
    {
      title: 'Access',
      dataIndex: 'access',
      filters: accessFilterList,
      onFilter: (value: string | number | boolean, record: DataCourseType) => record.access === value
    },
    {
      title: 'Final Price',
      dataIndex: 'finalPrice',
      sorter: (a, b) => a.finalPrice - b.finalPrice
    },
    {
      title: 'Price (before discount)',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Learners',
      dataIndex: 'learners',
      sorter: (a, b) => a.learners - b.learners
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt'
      // sorter: (a, b) => a.createdAt - b.createdAt
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

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataCourseType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);

    setTableParams({
      pagination
    });
  };

  return (
    <div className='course-list'>
      <Table columns={columns} dataSource={props.courseData} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CoursesList;
