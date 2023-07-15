import { Button, Col, Row, Select, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import React, { Fragment } from 'react';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import './Courses.scss';
import CourseItem from './components/CourseItem';
import { useState } from 'react';
import CoursesList from './components/CoursesList';
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

  return (
    <Fragment>
      <Header className='sub-header'>
        <Space className='sub-header__wrap'>
          {/* <Search placeholder='input search text' onSearch={onSearchHandler} style={{ width: 200 }} /> */}
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
            {viewTable === 'grid' && (
              <Row className='course-content__row' gutter={12}>
                <CourseItem md={6} />
                <CourseItem md={6} />
                <CourseItem md={6} />
                <CourseItem md={6} />
                <CourseItem md={6} />
                <CourseItem md={6} />
              </Row>
            )}

            {viewTable === 'list' && <CoursesList />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Courses;
