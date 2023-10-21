/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Radio, Rate, Select, Skeleton, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useGetAuthorsQuery, useGetCategoriesQuery, useGetCoursesQuery } from '../client.service';
import CourseList from '../components/CourseList';
import './Courses.scss';

import { SearchParamsStateType, useSearchParamsState } from 'react-use-search-params-state';

const { Search } = Input;
const Courses = () => {
  const filtersDefaults: SearchParamsStateType = {
    minPrice: { type: 'number', default: null },
    maxPrice: { type: 'number', default: null },
    // isSold: { type: 'boolean', default: true },
    // types: { type: 'string', default: null, multiple: true },
    _author: { type: 'string', default: [], multiple: true },
    _level: { type: 'string', default: [], multiple: true },
    _price: { type: 'string', default: [], multiple: true },
    _topic: { type: 'string', default: [], multiple: true },
    _page: { type: 'number', default: 1 }
  };

  const sortDefaults: SearchParamsStateType = {
    sort: { type: 'string', default: 'relavant' }
    // orderDir: { type: 'string', default: 'asc' }
  };

  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortParams, setSortParams] = useSearchParamsState(sortDefaults);

  const userId = useSelector((state: RootState) => state.auth.userId);

  const searchValue = searchParams.get('_q') || '';
  const sortValue = searchParams.get('_sort') || 'relavant';
  const authorValue = searchParams.getAll('_author') || '';
  const levelValue = searchParams.getAll('_level') || '';
  const priceValue = searchParams.getAll('_price') || '';
  const topicValue = searchParams.getAll('_topic') || '';

  const params = {
    _limit: searchParams.get('_limit') ? Number(searchParams.get('_limit')) : 12,
    _page: searchParams.get('_p') ? Number(searchParams.get('_p')) : 1,
    _q: searchValue,
    _author: authorValue,
    _level: levelValue,
    _price: priceValue,
    _sort: sortValue,
    _topic: topicValue,
    userId
  };

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const { data, isFetching } = useGetCoursesQuery(params);

  const isFiltered = authorValue || levelValue || priceValue;

  const numberOfResult = data?.pagination._totalRows || 0;
  // Get all categories at db
  const { data: categoriesData } = useGetCategoriesQuery();

  // Get all authors at db
  const { data: authorsData } = useGetAuthorsQuery();

  const categoriesList = categoriesData?.categories || [];

  const authorsList = authorsData?.authors || [];

  const levelList = ['All Level', 'Beginner', 'Intermediate', 'Advanced'];

  const navigate = useNavigate();

  const sortChangeHandler = (value: string) => {
    console.log('value: ', value);

    setSortParams({ _sort: value });
  };

  const filterAuthorsHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    // console.log('e.target: ', e.target.getAttribute('author-id'));
    const newValues = checked
      ? [...filterParams._author, value]
      : filterParams._author.filter((item: string) => item !== value);
    setFilterParams({ _author: newValues });
  };

  const filterLevelHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newValues = checked
      ? [...filterParams._level, value]
      : filterParams._level.filter((item: string) => item !== value);
    setFilterParams({ _level: newValues });
  };

  const filterPriceHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newValues = checked
      ? [...filterParams._price, value]
      : filterParams._price.filter((item: string) => item !== value);
    setFilterParams({ _price: newValues });
  };

  const filterTopicHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;

    const newValues = checked
      ? [...filterParams._topic, value]
      : filterParams._topic.filter((item: string) => item !== value);

    setFilterParams({ _topic: newValues });
  };

  const clearFilterHandler = () => {
    setSearchParams({});
  };

  const enrollFilterHandler = () => {
    console.log('object');
  };

  const paginateHandler = (page: number) => {
    setFilterParams({ _p: page });
  };

  return (
    <div className='courses'>
      <div className='courses__wrap container spacing-h-sm'>
        <h2 className='courses__heading'>Find your best courses</h2>
        <div className='courses__search-results'>
          <div className='courses__search-results-left'></div>
          <div className='courses__search-results-right'>{numberOfResult} results</div>
        </div>

        <div className='courses__content'>
          <div className='courses__filter-bar'>
            <div className='search-results'>
              {searchValue && (
                <h3 className='search-results__text'>
                  {numberOfResult} results for “{searchValue}”
                </h3>
              )}
              <div className='search-results__sort'>
                <Button>Sort</Button>
                <Select
                  defaultValue={sortValue === 'newest' ? 'newest' : 'Most Relavant'}
                  value={sortValue}
                  style={{ width: 130, marginLeft: '1rem' }}
                  onChange={sortChangeHandler}
                  options={[
                    { value: 'relevant', label: 'Relevant' },
                    { value: 'mostReviews', label: 'Most Reviews' },
                    { value: 'highestRated', label: 'Highest Rated' },
                    { value: 'newest', label: 'Newest' }
                  ]}
                />
                {isFiltered && (
                  <span onClick={clearFilterHandler} className='search-results__clear-filters'>
                    Clear Filters <CloseOutlined />
                  </span>
                )}
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
                  {isAuth && (
                    <>
                      <li className='status-filter__item'>
                        <a onChange={enrollFilterHandler} href='' className='status-filter__item-link'>
                          Not Enrolled
                        </a>
                      </li>
                      <li className='status-filter__item'>
                        <a onChange={enrollFilterHandler} href='' className='status-filter__item-link'>
                          Enrolled
                        </a>
                      </li>
                    </>
                  )}
                  {/* <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      Popular
                    </a>
                  </li>
                  <li className='status-filter__item'>
                    <a href='' className='status-filter__item-link'>
                      Free
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Authors</h3>
              <div className='authors-filter'>
                <ul className='authors-filter__list'>
                  {authorsList.map((author) => {
                    return (
                      <li key={author[1]._id} className='authors-filter__item'>
                        <Checkbox
                          value={author[1]._id}
                          checked={filterParams._author.includes(author[1]._id)}
                          onChange={filterAuthorsHandler}
                        >
                          {author[1].name}
                        </Checkbox>
                        {/* <a
                          onClick={filterAuthorsHandler}
                          className='authors-filter__item-link'
                          href=''
                          author-id={author[1]._id}
                        >
                          {author[1].name}
                        </a> */}
                      </li>
                    );
                  })}
                  {/* <li className='authors-filter__item'>
                    <a className='authors-filter__item-link' href=''>
                      Sang
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            {/* Level filter */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Level</h3>
              <div className='course-level'>
                <ul className='course-level__list'>
                  {levelList.map((level, index) => {
                    return (
                      <li key={index} className='course-level__item'>
                        <Checkbox
                          value={level}
                          checked={filterParams._level.includes(level)}
                          onChange={filterLevelHandler}
                        >
                          {level}
                        </Checkbox>
                      </li>
                    );
                  })}
                  {/* <li className='course-level__item'>
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
                  </li> */}
                </ul>
              </div>
            </div>

            {/* Price filter */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Price</h3>
              <div className='course-by-price'>
                <ul className='course-by-price__list'>
                  <li className='course-by-price__item'>
                    <Checkbox value='Free' checked={filterParams._price.includes('Free')} onChange={filterPriceHandler}>
                      Free
                    </Checkbox>
                  </li>
                  <li className='course-by-price__item'>
                    <Checkbox value='Paid' checked={filterParams._price.includes('Paid')} onChange={filterPriceHandler}>
                      Paid
                    </Checkbox>
                  </li>
                </ul>
              </div>
            </div>

            {/* Topic filter */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Topic course</h3>
              <div className='course-topic'>
                <ul className='course-topic__list'>
                  {categoriesList.map((cateItem) => {
                    return (
                      <li key={cateItem._id} className='course-topic__item'>
                        <Checkbox
                          checked={filterParams._topic.includes(cateItem._id)}
                          value={cateItem._id}
                          onChange={filterTopicHandler}
                        >
                          {cateItem.name}
                        </Checkbox>
                      </li>
                    );
                  })}
                  {/* <li className='course-topic__item'>
                    <a className='course-topic__item-link' href=''>
                      Javascript
                    </a>
                  </li>
                  <li className='course-topic__item'>
                    <a className='course-topic__item-link' href=''>
                      Free
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* Ratings */}
            <div className='courses__filter-bar-item'>
              <h3 className='courses__filter-bar-item-title'>Course Ratings</h3>
              <div className='course-ratings'>
                <ul className='course-ratings__list'>
                  {/* <li className='course-ratings__item'>
                    <a className='course-ratings__item-link' href=''>
                      5 star
                    </a>
                  </li>
                  <li className='course-ratings__item'>
                    <a className='course-ratings__item-link' href=''>
                      4.5 star
                    </a>
                  </li> */}
                  {/* onChange={filterRatingHandler} value={value} */}
                  <Radio.Group>
                    <Space direction='vertical'>
                      <Radio value={1}>
                        <Rate allowHalf defaultValue={4.5} />
                        <span className='ml-2 font-normal'> 4.5 & up</span>
                      </Radio>
                      <Radio value={2}>
                        <Rate allowHalf defaultValue={4.0} />
                        <span className='ml-2 font-normal'> 4.0 & up</span>
                      </Radio>
                      <Radio value={3}>
                        <Rate allowHalf defaultValue={3.5} />
                        <span className='ml-2 font-normal'> 3.5 & up</span>
                      </Radio>
                      <Radio value={4}>
                        <Rate allowHalf defaultValue={3} />
                        <span className='ml-2 font-normal'> 3 & up</span>
                      </Radio>
                      {/* <Radio value={4}>
                        More...
                        {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                      </Radio> */}
                    </Space>
                  </Radio.Group>
                </ul>
              </div>
            </div>

            {/* Video duration */}

            {/* Filter by features (quizz, coding exercise, ...) */}
          </div>

          <div className='courses__list'>
            {isFetching && <Skeleton />}
            <CourseList
              courseState='notOrdered'
              courses={data?.courses}
              pagination={data?.pagination}
              className='courses__list-row'
              onPaginate={paginateHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
