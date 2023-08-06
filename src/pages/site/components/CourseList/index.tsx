import type { PaginationProps } from 'antd';
import { Pagination, Row } from 'antd';
import { Fragment, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../../components/Button';
import { ICourse } from '../../../../types/course.type';
import { IPagination } from '../../../../types/pagination';
import { ICourseEnrolledByUser } from '../../client.service';
import CourseItem from '../CourseItem';
import './CourseList.scss';
type CourseListProps = {
  className: string;
  courses?: ICourseEnrolledByUser[] | ICourse[];
  pagination?: IPagination;
  courseState: string;
  isLoadMore?: boolean;
  onPaginate?: (page: number) => void;
};
// props: Props

const CourseList = (props: CourseListProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = {
    _limit: searchParams.get('_limit') ? Number(searchParams.get('_limit')) : 12,
    _page: searchParams.get('_p') ? Number(searchParams.get('_p')) : 1,
    _q: searchParams.get('_q') || ''
  };

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

  const [current, setCurrent] = useState(params._page || 1);

  const paginationChangeHandler: PaginationProps['onChange'] = (page) => {
    console.log(page);
    // setSearchParams({ _p: `${page}` });

    if (props.onPaginate) {
      props.onPaginate(page);
    }
    setCurrent(page);
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
      {props.pagination && (
        <div className='our-courses__pagination'>
          <Pagination
            current={current}
            onChange={paginationChangeHandler}
            total={props.pagination._totalRows}
            pageSize={props.pagination._limit || 12}
          />
        </div>
      )}

      <div className='our-courses__btn-place'>
        <Button onClick={loadMoreHandler} className='btn btn-secondary btn-sm'>
          Load more
        </Button>
      </div>
    </Fragment>
  );
};

export default CourseList;
