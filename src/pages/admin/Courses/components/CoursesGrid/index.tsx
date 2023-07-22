import React from 'react';
import CourseItem from '../CourseItem';
import { Row } from 'antd';
import { ICourse } from '../../../../../types/course.type';

interface CoursesGridProps {
  courseData: ICourse[];
}

const CoursesGrid = (props: CoursesGridProps) => {
  return (
    <div className='courses-grid'>
      <Row className='course-content__row' gutter={12}>
        {props.courseData.map((courseItem) => (
          <CourseItem key={courseItem._id} md={6} course={courseItem} />
        ))}
      </Row>
    </div>
  );
};

export default CoursesGrid;
