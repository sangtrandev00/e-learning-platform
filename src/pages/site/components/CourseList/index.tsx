import { Row } from 'antd';
import React, { Fragment } from 'react';
import CourseItem from '../CourseItem';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import { getCoursesResponse } from '../../client.service';

type CourseListProps = {
  className: string;
  data?: getCoursesResponse;
  courseState: string;
};
// props: Props

const CourseList = (props: CourseListProps) => {
  const navigate = useNavigate();

  const moveToDetail = (id: string) => {
    console.log('moveToDetail', id);

    if (props.courseState === 'ordered') {
      navigate(`/path-player?courseId=${id}`);
    } else {
      navigate(`/courses/${id}`);
    }
  };

  return (
    <Fragment>
      <Row gutter={16} className={props.className}>
        {props.data?.courses.map((courseItem) => (
          <CourseItem
            courseState={props.courseState}
            key={courseItem._id}
            courseItem={courseItem}
            onClick={moveToDetail}
          />
        ))}
        {/* <CourseItem onClick={moveToDetail} />
        <CourseItem onClick={moveToDetail} />
        <CourseItem onClick={moveToDetail} /> */}
      </Row>

      <div className='our-courses__btn-place'>
        <Button className='btn btn-secondary btn-sm'>Load more</Button>
      </div>
    </Fragment>
  );
};

export default CourseList;
