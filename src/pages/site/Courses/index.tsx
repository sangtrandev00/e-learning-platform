import React, { Fragment } from 'react';
import './Courses.scss';
import { Input, Row } from 'antd';
import CourseItem from '../components/CourseItem';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const Courses = () => {
  const navigate = useNavigate();

  const moveToDetail = (id: string) => {
    console.log('moveToDetail', id);

    navigate(`/courses/${id}`);
  };

  return (
    <div className='courses'>
      <div className='courses__wrap container spacing-h-md'>
        <h2 className='courses__heading'>Courses</h2>

        <div className='courses__content'>
          <div className='courses__filter-bar'>
            <div className='courses__filter-bar-item'>
              <Search placeholder='Search for courses' onSearch={onSearch} style={{ width: 200 }} />
            </div>
            <div className='courses__filter-bar-item'>
              <div className='status-filter'>
                <ul className='status-filter__list'>
                  <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      All
                    </a>
                  </li>
                  <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      Not enrolld
                    </a>
                  </li>
                  <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      Newest
                    </a>
                  </li>
                  <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      Popular
                    </a>
                  </li>
                  <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      Free
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Authors</h3>
              <div className='authors-filter'>
                <ul className='authors-filter__list'>
                  <li className='authors-filter__item'>
                    <a className='authors-filter__item-link' href=''>
                      Sang
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='courses__list'>
            <Row className='courses__list-row' gutter={16}>
              <CourseItem onClick={moveToDetail} />
              <CourseItem onClick={moveToDetail} />
              <CourseItem onClick={moveToDetail} />
              <CourseItem onClick={moveToDetail} />
              <CourseItem onClick={moveToDetail} />
              <CourseItem onClick={moveToDetail} />
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
