import { Badge, Col, Progress, Row, notification } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import { BACKEND_URL } from '../../../../constant/backend-domain';
import { RootState } from '../../../../store/store';
import { ICourse } from '../../../../types/course.type';
import { IOrderItem } from '../../../../types/order.type';
import { openAuthModal } from '../../../auth.slice';
import { ICourseEnrolledByUser, useGetUserDetailQuery } from '../../client.service';
import { addToCart } from '../../client.slice';
import './CourseItem.scss';

type CourseItemProps = {
  courseItem: ICourseEnrolledByUser | ICourse;
  courseState?: string;
  onClick: (_id: string) => void | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  onEnroll?: (courseItem: IOrderItem) => void;
};

const CourseItem = (props: CourseItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data, isFetching } = useGetUserDetailQuery(
    { _userId: userId },
    {
      skip: !userId
    }
  );

  let hasBought = false;

  if ((props.courseItem as ICourseEnrolledByUser).isBought) {
    hasBought = true;
  }

  const btnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnEl = e.target as HTMLButtonElement;
    const dataAction = btnEl.dataset.action;

    console.log('btn click handler!!!');

    // If already logined

    if (isAuth) {
      if (dataAction === 'buynow') {
        dispatch(addToCart(props.courseItem._id));

        navigate('/checkout');
      } else if (dataAction === 'enroll') {
        console.log('go to enroll page');

        const newOrderItem: IOrderItem = {
          courseId: props.courseItem._id,
          name: props.courseItem.name,
          thumbnail: props.courseItem.thumbnail,
          finalPrice: props.courseItem.finalPrice
        };

        if (newOrderItem) {
          props.onEnroll && props.onEnroll(newOrderItem);
        }
      }
    } else {
      // If not logined

      notification.warning({ message: 'You need to login to enroll/buy this course' });

      dispatch(openAuthModal());
    }

    // console.log('enrolled or buy now!');
  };

  if (!props.courseItem) return null;

  let progressPercent: string | number;
  if (props.courseState === 'ordered') {
    progressPercent = ((props.courseItem as ICourseEnrolledByUser).progress * 100).toFixed(2);
  } else {
    progressPercent = 0;
  }

  // Go to course handler
  const gotoCourseHandler = () => {
    navigate(`/path-player?courseId=${props.courseItem._id}`);
  };

  const viewCourseDetail = () => {
    props?.onClick(props.courseItem._id);
  };

  let backgroundImageUrl = '';

  if (props.courseItem.thumbnail.startsWith('http')) {
    backgroundImageUrl = encodeURI(props.courseItem.thumbnail);
  } else {
    backgroundImageUrl = encodeURI(`${BACKEND_URL}/${props.courseItem.thumbnail}`);
  }

  let badgeCourse = 'new';

  if (props.courseItem.finalPrice < props.courseItem.price) {
    badgeCourse = 'Special Offer';
  }

  return (
    <Col
      lg={currentPath === '/start' || currentPath === '/' ? 6 : 8}
      md={currentPath === '/start' || currentPath === '/' ? 8 : 12}
      sm={12}
      xs={24}
    >
      <Badge.Ribbon text={badgeCourse}>
        <div className='course-item'>
          <div
            className='course-item__img'
            onClick={viewCourseDetail}
            style={{
              backgroundImage: `url(${backgroundImageUrl || ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='course-item__content'>
            <h3 onClick={viewCourseDetail} className='course-item__title course-item__title--courses-page'>
              {props.courseItem.name}
            </h3>
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
                  {!hasBought && props.courseState !== 'ordered' && (
                    <Button
                      onClick={btnClickHandler}
                      action={props.courseItem.finalPrice === 0 ? 'enroll' : 'buynow'}
                      className={`course-item__enrolls-btn btn btn-secondary btn-sm ${
                        props.courseItem.finalPrice === 0 && props.courseState !== 'ordered'
                          ? 'course-item__enrolls-btn--free'
                          : ''
                      }`}
                    >
                      {props.courseState !== 'ordered' && (props.courseItem.finalPrice === 0 ? 'Enroll' : 'Buy Now')}
                    </Button>
                  )}
                  {hasBought && (
                    <Button
                      onClick={gotoCourseHandler}
                      className='btn btn-secondary btn-sm course-item__enrolls-btn--free'
                      action='goto-course'
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
