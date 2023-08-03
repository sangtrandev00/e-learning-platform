import { Button, Col, Row, Select, Space, Input, Skeleton, Popover, notification } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { Fragment, useEffect } from 'react';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CourseItem from './components/CourseItem';
import { useState } from 'react';
import CoursesList from './components/CoursesList';
import './Courses.scss';
import CoursesGrid from './components/CoursesGrid';
import { useDeleteCourseMutation, useGetAllCoursesQuery, useGetCoursesQuery } from './course.service';
import { Link } from 'react-router-dom';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useGetAuthorsQuery } from '../../site/client.service';
import { useGetCategoriesQuery } from '../Categories/category.service';

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
const { Search } = Input;

const SettingContent = (props: { courseId: string }) => {
  const [deleteCourse, deleteCourseResult] = useDeleteCourseMutation();

  const deleteCourseHandler = () => {
    console.log(props.courseId);

    deleteCourse(props.courseId)
      .unwrap()
      .then((result) => {
        console.log(result);

        notification.success({
          message: 'Delete course ',
          description: 'Delete course successfuly',
          duration: 2
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  return (
    <div>
      <p>Content</p>
      <a onClick={deleteCourseHandler}>Delete</a>
    </div>
  );
};

const Courses = () => {
  const [viewTable, setViewTable] = useState<string>('grid');

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

  const [params, setParams] = useState({
    _q: '',
    _author: '',
    _category: '',
    _page: 1,
    _limit: 8
  });

  const [allCoursesParams, setAllCoursesParams] = useState({
    _q: ''
  });

  const [courseData, setCourseData] = useState<DataCourseType[]>();

  const [allCoursesListData, setAllCoursesData] = useState<DataCourseType[]>();

  const { data: dataList, isFetching } = useGetCoursesQuery(params);
  const { data: allCoursesData, isFetching: isAllCoursesFetching } = useGetAllCoursesQuery(allCoursesParams);

  const { data: categoriesData, isFetching: isCategoriesFetching } = useGetCategoriesQuery({ _q: '' });

  const { data: authorData, isFetching: isAuthorsFetching } = useGetAuthorsQuery();

  const authorFilterList = authorData?.authors.map((author) => {
    return {
      text: author[0],
      value: author[0],
      _id: author[1]._id
    };
  });

  const cateFilterList = categoriesData?.categories.map((cate) => {
    return {
      text: cate.name,
      value: cate.name,
      _id: cate._id
    };
  });

  cateFilterList?.unshift({
    text: 'all',
    value: 'all',
    _id: 'all'
  });

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
                <Popover placement='bottomRight' content={<div>Hello actions</div>} title='Actions'>
                  <Button>
                    <EllipsisOutlined />
                  </Button>
                </Popover>
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

  // GET ALL COURSES DATA
  useEffect(() => {
    if (allCoursesData) {
      const sourceCourseData = allCoursesData.courses.map((courseItem) => {
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
                <Popover placement='bottomRight' content={<SettingContent courseId={_id} />} title='Actions'>
                  <Button>
                    <EllipsisOutlined />
                  </Button>
                </Popover>
              </Space>
            </Fragment>
          )
        };
        return courseTemplateItem;
      });

      setAllCoursesData(sourceCourseData);
    } else {
      setAllCoursesData([]);
    }
  }, [allCoursesData]);

  const onSearchHandler = (value: string) => {
    if (viewTable === 'grid') {
      setParams({
        ...params,
        _q: value
      });
    } else if (viewTable === 'list') {
      setAllCoursesParams({
        ...allCoursesParams,
        _q: value
      });
    }
  };

  const authorsFitlerHandler = (value: string, record: { _id: string; text: string; name: string }) => {
    setParams({ ...params, _author: record._id });
  };

  const paginateHandler = (page: number) => {
    setParams({
      ...params,
      _page: page
    });
  };

  const cateFilterHandler = (value: string, record: { _id: string; text: string; name: string }) => {
    console.log('cate filter: ', value);

    console.log('record: ', record);

    setParams({
      ...params,
      _category: record._id
    });
  };

  return (
    <Fragment>
      <Header className='sub-header'>
        <Space className='sub-header__wrap'>
          <Search placeholder='Search courses' onSearch={onSearchHandler} style={{ width: 200 }} />
          {/* <Select
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
          /> */}

          {viewTable === 'grid' && (
            <Select
              size='middle'
              placeholder='Please select your categories'
              defaultValue={'All Categories'}
              onChange={cateFilterHandler}
              style={{ width: '240px' }}
              options={cateFilterList}
            />
          )}

          {viewTable === 'grid' && (
            <Select
              size='middle'
              placeholder='Please select Your Authors'
              // defaultValue={[{ text: 'All Authors', value: 'all' }]}
              onChange={authorsFitlerHandler}
              style={{ width: '200px' }}
              options={authorFilterList}
            />
          )}

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
            {viewTable === 'grid' && (
              <span className='course-content__show-text'>Showing {dataList?.pagination._totalRows} courses</span>
            )}
          </div>
          <div className='course-content__list'>
            {isFetching && <Skeleton />}

            {viewTable === 'grid' && (
              <CoursesGrid
                onPaginate={paginateHandler}
                pagination={dataList?.pagination || { _page: 1, _limit: 8, _totalRows: 100 }}
                courseData={dataList?.courses || []}
              />
            )}

            {viewTable === 'list' && <CoursesList courseData={allCoursesListData || []} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Courses;
