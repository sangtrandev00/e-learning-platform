import { Badge, Col, Progress, Row, Spin } from 'antd';
import Button from '../../../../components/Button';
import './CourseItem.scss';
import { ICourse } from '../../../../types/course.type';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { ICourseEnrolledByUser, useGetUserDetailQuery } from '../../client.service';
import { RootState } from '../../../../store/store';

type CourseItemProps = {
  courseItem: ICourseEnrolledByUser | ICourse;
  courseState?: string;
  onClick: (_id: string) => void | ((e: React.MouseEvent<HTMLButtonElement>) => void);
};

// Generate style of course-item__img

const CourseItem = (props: CourseItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  console.log('current params: ', currentPath);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data, isFetching } = useGetUserDetailQuery({ _userId: userId });

  let hasBought = false;

  if (isAuth) {
    console.log('authenticated');

    console.log('How to check course already bought buy this user!');

    console.log(data?.user.courses.map((course) => course._id));

    const courseIdsByUser = data?.user.courses.map((course) => course._id);
    if (courseIdsByUser?.includes(props.courseItem._id)) {
      hasBought = true;
    }
  }

  const clickHandler = () => {
    // e.preventDefault();
    navigate(`/fsdfds`);
  };

  if (!props.courseItem) return null;

  let progressPercent: string | number;
  if (props.courseState === 'ordered') {
    progressPercent = ((props.courseItem as ICourseEnrolledByUser).progress * 100).toFixed(2);
  } else {
    progressPercent = 0;
  }

  const gotoCourseHandler = () => {
    console.log('go to course handler');

    navigate(`/path-player?courseId=${props.courseItem._id}`);
  };

  const viewCourseDetail = () => {
    if (!isAuth) {
      props?.onClick(props.courseItem._id);
    }
  };

  return (
    <Col onClick={viewCourseDetail} md={currentPath === '/start' || currentPath === '/' ? 6 : 8}>
      <Badge.Ribbon text='Special Offer'>
        <div className='course-item'>
          <div
            className='course-item__img'
            style={{
              backgroundImage: `url(${encodeURI(props.courseItem.thumbnail) || ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='course-item__content'>
            <h3 className='course-item__title course-item__title--courses-page'>{props.courseItem.name}</h3>
            {props.courseState === 'ordered' && (
              <Progress className='course-item__process' percent={progressPercent as number} />
            )}
            <div className='course-item__desc'>{props.courseItem.description}</div>
            <div className='course-item__author'>
              <img
                src={props.courseItem.userId.avatar || 'https://via.placeholder.com/150'}
                alt=''
                className='course-item__author-img'
              />
              <div className='course-item__author-name'>{props.courseItem.userId.name}</div>
            </div>
            <div className='course-item__enrolls'>
              <Row className='course-item__enrolls-row' justify='space-around' align='middle'>
                <Col md={12}>
                  {!hasBought && (
                    <Button
                      onClick={clickHandler}
                      className={`course-item__enrolls-btn btn btn-secondary btn-sm ${
                        props.courseItem.finalPrice === 0 && props.courseState !== 'ordered'
                          ? 'course-item__enrolls-btn--free'
                          : ''
                      }`}
                    >
                      {props.courseState === 'ordered' && 'Continue'}
                      {props.courseState !== 'ordered' && (props.courseItem.finalPrice === 0 ? 'Enroll' : 'Buy Now')}
                    </Button>
                  )}
                  {hasBought && (
                    <Button
                      onClick={gotoCourseHandler}
                      className='btn btn-secondary btn-sm course-item__enrolls-btn--free'
                    >
                      Goto Course
                    </Button>
                  )}
                </Col>
                <Col md={12}>
                  {props.courseState !== 'ordered' && (
                    <div className='course-item__prices'>
                      {props.courseItem.finalPrice === 0 ? (
                        <div className='course-item__prices-free'>FREE</div>
                      ) : (
                        <>
                          <span className='course-item__prices-old'>${props.courseItem.price}</span>
                          <span className='course-item__prices-new'>${props.courseItem.finalPrice}</span>
                        </>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Badge.Ribbon>
    </Col>
  );
};

// generate default props for this component

CourseItem.defaultProps = {
  courseItem: {
    _id: '',
    name: '',
    thumbnail: '',
    description: '',
    price: 0,
    finalPrice: 0,
    userId: {
      _id: '',
      name: '',
      avatar: ''
    },
    createdAt: '',
    updatedAt: '',
    categoryId: {
      _id: '',
      name: ''
    }
  }
};
export default CourseItem;
