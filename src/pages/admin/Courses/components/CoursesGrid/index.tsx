import React, { useState } from 'react';
import CourseItem from '../CourseItem';
import { Pagination, Row } from 'antd';
import { ICourse } from '../../../../../types/course.type';
import type { PaginationProps } from 'antd';
import { IPagination } from '../../../../../types/pagination';
import './CoursesGrid.scss';
interface CoursesGridProps {
  courseData: ICourse[];
  pagination: IPagination;
  onPaginate: (page: number) => void;
}

const CoursesGrid = (props: CoursesGridProps) => {
  const [current, setCurrent] = useState(props.pagination._page);

  const onChange: PaginationProps['onChange'] = (page: number) => {
    console.log(page);
    props.onPaginate(page);
    setCurrent(page);
  };

  return (
    <div className='courses-grid'>
      <Row className='course-content__row' gutter={12}>
        {props.courseData.map((courseItem) => (
          <CourseItem key={courseItem._id} md={6} course={courseItem} />
        ))}
      </Row>
      <Pagination
        className='courses-grid__pagination'
        onChange={onChange}
        defaultCurrent={current}
        total={props.pagination._totalRows}
        pageSize={8}
      />
    </div>
  );
};

export default CoursesGrid;
