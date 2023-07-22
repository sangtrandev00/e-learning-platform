import { Button, Col, Row, Select, Space, Input, Skeleton } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { Fragment, useEffect } from 'react';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CourseItem from './components/CourseItem';
import { useState } from 'react';
import CoursesList from './components/CoursesList';
import './Courses.scss';
import CoursesGrid from './components/CoursesGrid';
import { useGetCoursesQuery } from './course.service';
import { Link } from 'react-router-dom';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

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
  categories: any;
  access: Access;
  finalPrice: number;
  price: number;
  learners: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  updatedAt: string;
  actions?: any;
}
const { Search } = Input;
const Courses = () => {
  const [viewTable, setViewTable] = useState<string>('grid');

  const onSearchHandler = (value: string) => {
    console.log(value);
  };

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  const changeTableToList = () => {
    console.log('changeTableToList');

    setViewTable('list');
  };

  const changeTableToGrid = () => {
    setViewTable('grid');
  };

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
          author: userId.name,
          categories: categoryId.name,
          access: Access.FREE,
          finalPrice: finalPrice,
          price: price,
          learners: 10,
          createdAt: '18 jun 2023',
          updatedAt: '18 jun 2023',
          actions: (
            <Fragment>
              <Space>
                <Button>
                  <Link to={`/author/courses/${_id}`}>
                    <EditOutlined />
                  </Link>
                </Button>
                <Button>
                  <EllipsisOutlined />
                </Button>
              </Space>
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

  return (
    <Fragment>
      <Header className='sub-header'>
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

          <Button onClick={changeTableToGrid}>
            <AppstoreOutlined />
          </Button>
          <Button onClick={changeTableToList}>
            <UnorderedListOutlined />
          </Button>
        </Space>
      </Header>
      <div className='course-content'>
        <div className='course-content__wrap'>
          <div className='course-content__show-result'>
            <span className='course-content__show-text'>Showing 6 courses</span>
          </div>
          <div className='course-content__list'>
            {isFetching && <Skeleton />}

            {viewTable === 'grid' && <CoursesGrid courseData={dataList?.courses || []} />}

            {viewTable === 'list' && <CoursesList courseData={courseData || []} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Courses;
