import { AppstoreOutlined, EditOutlined, EllipsisOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Input, Popover, Select, Skeleton, Space, notification } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { RootState } from '../../../store/store';
import { UserRole } from '../../../types/user.type';
import { useGetAuthorsQuery } from '../../site/client.service';
import { useGetCategoriesQuery } from '../Categories/category.service';
import './Courses.scss';
import CoursesGrid from './components/CoursesGrid';
import CoursesList from './components/CoursesList';
import { useDeleteCourseMutation, useGetAllCoursesQuery, useGetCoursesQuery } from './course.service';

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
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

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
    _author: adminRole === UserRole.ADMIN ? 'all' : adminId,
    _category: '',
    _page: 1,
    _limit: 8
  });

  const [allCoursesParams, setAllCoursesParams] = useState({
    _q: '',
    _author: adminRole === UserRole.ADMIN ? 'all' : adminId
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
      _id: author[1]._id,
      name: author[0]
    };
  });

  authorFilterList?.unshift({
    text: 'all',
    value: 'all',
    _id: 'all',
    name: 'all'
  });

  const cateFilterList =
    categoriesData?.categories.map((cate) => {
      return {
        text: cate.name,
        value: cate.name,
        _id: cate._id
      };
    }) || [];

  cateFilterList.unshift({
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

        let thumbnailUrl = thumbnail;

        if (thumbnail.startsWith('http')) {
          thumbnailUrl = thumbnail;
        } else {
          thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
        }

        const courseTemplateItem: DataCourseType = {
          key: `${_id}`,
          name: (
            <div className='table__col-name'>
              <img title={name} className='table__col-name-img' src={thumbnailUrl} />
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

        let thumbnailUrl = '';
        if (thumbnail.startsWith('http')) {
          thumbnailUrl = thumbnail;
        } else {
          thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
        }

        const courseTemplateItem: DataCourseType = {
          key: `${_id}`,
          name: (
            <div className='table__col-name'>
              <img title={name} className='table__col-name-img' src={thumbnailUrl} />
              <span className='table__col-name-text'>{name}</span>
            </div>
          ),
          author: userId?.name,
          categories: categoryId?.name,
          access: Access.FREE,
          // Gio Tinh. -> Course detail
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

  const authorsFitlerHandler = (
    value: string,
    option: { _id: string; text: string; name: string } | { _id: string; text: string; name: string }[]
  ) => {
    if (!Array.isArray(option)) {
      setParams({ ...params, _author: option._id });
    }
  };

  const paginateHandler = (page: number) => {
    setParams({
      ...params,
      _page: page
    });
  };

  const cateFilterHandler = (
    value: string,
    option: { _id: string; text: string; name: string } | { _id: string; text: string; name: string }[]
  ) => {
    console.log('cate filter: ', value);

    console.log('record: ', option);

    if (!Array.isArray(option)) {
      setParams({
        ...params,
        _category: option._id
      });
    }
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
              options={cateFilterList as { _id: string; text: string; value: string; name: string }[]}
            />
          )}

          {viewTable === 'grid' && adminRole === UserRole.ADMIN && (
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
