import { Row } from 'antd';
import React, { Fragment } from 'react';
import CourseItem from '../CourseItem';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import { ICourseEnrolledByUser, getCoursesResponse } from '../../client.service';
import { ICourse } from '../../../../types/course.type';

type CourseListProps = {
  className: string;
  courses?: ICourseEnrolledByUser[] | ICourse[];
  courseState: string;
  isLoadMore?: boolean;
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

  const loadMoreHandler = () => {
    console.log('load more');
  };

  return (
    <Fragment>
      <Row gutter={16} className={props.className}>
        {(props.courses || []).map((courseItem) => (
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
        <Button onClick={loadMoreHandler} className='btn btn-secondary btn-sm'>
          Load more
        </Button>
      </div>
    </Fragment>
  );
};

export default CourseList;
