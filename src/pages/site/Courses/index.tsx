import React, { Fragment } from 'react';
import './Courses.scss';
import { Button, Input, Row, Select } from 'antd';
import CourseItem from '../components/CourseItem';
import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList';
import { useGetCoursesQuery } from '../client.service';

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const Courses = () => {
  const params = {
    _limit: 12,
    _page: 1
  };

  const { data, isFetching } = useGetCoursesQuery(params);

  const navigate = useNavigate();

  const moveToDetail = (id: string) => {
    console.log('moveToDetail', id);

    navigate(`/courses/${id}`);
  };

  const sortChangeHandler = (value: string) => {
    console.log('value: ', value);
  };

  return (
    <div className='courses'>
      <div className='courses__wrap container spacing-h-sm'>
        <h2 className='courses__heading'>Find your best courses</h2>
        <div className='courses__search-results'>
          <div className='courses__search-results-left'></div>
          <div className='courses__search-results-right'>10,000 results</div>
        </div>

        <div className='courses__content'>
          <div className='courses__filter-bar'>
            <div className='search-results'>
              <h3 className='search-results__text'>10,000 results for “javascript”</h3>
              <div className='search-results__sort'>
                <Button>Sort</Button>
                <Select
                  defaultValue='Most relevant'
                  style={{ width: 140, marginLeft: '1rem' }}
                  onChange={sortChangeHandler}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
                <span>Clear Filters</span>
              </div>
            </div>
            <div className='courses__filter-bar-item'>
              {/* <Search placeholder='Search for courses' onSearch={onSearch} style={{ width: 200 }} /> */}
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

            {/* Level filter */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Level</h3>
              <div className='course-level'>
                <ul className='course-level__list'>
                  <li className='course-level__item'>
                    <a className='course-level__item-link' href=''>
                      All Levels
                    </a>
                  </li>
                  <li className='course-level__item'>
                    <a className='course-level__item-link' href=''>
                      Beginer
                    </a>
                  </li>
                  <li className='course-level__item'>
                    <a className='course-level__item-link' href=''>
                      Intermidate
                    </a>
                  </li>
                  <li className='course-level__item'>
                    <a className='course-level__item-link' href=''>
                      Expert
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price filter */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Price</h3>
              <div className='course-by-price'>
                <ul className='course-by-price__list'>
                  <li className='course-by-price__item'>
                    <a className='course-by-price__item-link' href=''>
                      Paid
                    </a>
                  </li>
                  <li className='course-by-price__item'>
                    <a className='course-by-price__item-link' href=''>
                      Free
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Topic filter */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Topic course</h3>
              <div className='course-topic'>
                <ul className='course-topic__list'>
                  <li className='course-topic__item'>
                    <a className='course-topic__item-link' href=''>
                      Javascript
                    </a>
                  </li>
                  <li className='course-topic__item'>
                    <a className='course-topic__item-link' href=''>
                      Free
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Ratings */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Course Ratings</h3>
              <div className='course-ratings'>
                <ul className='course-ratings__list'>
                  <li className='course-ratings__item'>
                    <a className='course-ratings__item-link' href=''>
                      5 star
                    </a>
                  </li>
                  <li className='course-ratings__item'>
                    <a className='course-ratings__item-link' href=''>
                      4.5 star
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Video duration */}

            {/* Filter by features (quizz, coding exercise, ...) */}
          </div>

          <div className='courses__list'>
            <CourseList courseState='notOrdered' courses={data?.courses} className='courses__list-row' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
