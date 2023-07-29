import React, { useState } from 'react';
import './CourseDetail.scss';
import { Breadcrumb, Button, Col, Collapse, CollapseProps, List, Row, Space, Typography } from 'antd';
import {
  StarOutlined,
  StarFilled,
  CheckOutlined,
  DownOutlined,
  RightCircleFilled,
  HeartOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import { useGetCourseDetailQuery, useGetCourseQuery, useGetSectionsByCourseIdQuery } from '../client.service';
import { Skeleton } from 'antd';
import { AccessStatus, CourseLevel, ICourse } from '../../../types/course.type';
import SectionList from './components/SectionList';
import { useDispatch } from 'react-redux';
import { addToCart } from '../client.slice';
import { formatTime, formatVideoLengthToHours, transformDate } from '../../../utils/functions';
// type Props = {}
const courseData = [
  'Deploy a feature-complete app to production.',
  'Write integration and unit tests to ensure your code is working',
  'Use an API client to manually test your app.',
  'Make your code more reusable and testable with dependency injection.',
  'Get a behind-the-scenes understanding of NestJS.'
];

const initCourseDetail = {
  _id: '',
  name: '',
  description: '',
  price: 0,
  finalPrice: 0,
  access: AccessStatus.FREE,
  level: CourseLevel.BEGINNER,
  thumbnail: '',
  courseSlug: '',
  categoryId: {
    _id: '646781266859a50acfca8e93',
    name: 'Web'
  },
  userId: {
    _id: '6468a145401d3810494f4797',
    name: 'Nguyen Van A',
    avatar: ''
  },
  numOfReviews: 0,
  totalVideosLength: 0,
  sections: 0,
  lessons: 0,
  students: 0,
  avgRatingStars: 0,
  createdAt: '',
  updatedAt: ''
};

const CourseDetail = () => {
  // HOOKS HERE
  const params = useParams();
  const dispatch = useDispatch();

  const { courseId } = params;

  const { data, isFetching } = useGetCourseDetailQuery(courseId || '');

  console.log('course detail: ', data);

  let courseDetail = initCourseDetail;

  if (data) {
    courseDetail = data.course;
  }

  const {
    _id,
    name,
    description,
    price,
    finalPrice,
    thumbnail,
    level,
    courseSlug,
    categoryId,
    userId,
    numOfReviews,
    totalVideosLength,
    sections,
    lessons,
    avgRatingStars,
    students,
    createdAt,
    updatedAt
  } = courseDetail;

  console.log(numOfReviews);

  const { data: sectionData, isFetching: isSectionFetching } = useGetSectionsByCourseIdQuery(courseId || '');

  const numOfSections = sectionData?.sections.length || 0;

  console.log(sectionData);

  const overviewData = [
    `${formatVideoLengthToHours(totalVideosLength)} on-demand video`,
    `${sections} articles.`,
    '35 downloadable resources.',
    'Access on mobile and TV.',
    'Full lifetime access.',
    'Certificate of completion.'
  ];

  const addCartHandler = () => {
    console.log('add to cart: course id: ', _id);

    dispatch(addToCart(_id));
  };

  const subscribeCourseHandler = () => {
    console.log('subscribe course: course id: ', _id);
  };

  const buyNowHandler = () => {
    console.log('buy now handler');
  };

  return (
    <div className='course-detail'>
      <div className='course-detail__wrap spacing-h-sm'>
        <div className='course-detail__intro '>
          <div className='container'>
            <Row gutter={16} className='course-detail__intro-wrap'>
              <Col md={16}>
                <Breadcrumb
                  className='course-detail__breadcrumb'
                  items={[
                    {
                      title: 'Home'
                    },
                    {
                      title: <a href=''>Application Center</a>
                    },
                    {
                      title: <a href=''>Application List</a>
                    },
                    {
                      title: 'An Application'
                    }
                  ]}
                />

                <h2 className='course-detail__title'>{name}</h2>
                <p className='course-detail__sub-title'>{description}</p>
                <div className='course-detail__info'>
                  <div className='course-detail__info-item course-detail__info-status'>Bestseller</div>
                  <div className='course-detail__info-item course-detail__info-rating'>
                    <Space>
                      <span>{avgRatingStars}</span>
                      <span>
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                      </span>
                      <Link to='/'>({numOfReviews} ratings)</Link>
                    </Space>
                  </div>
                  <div className='course-detail__info-item course-detail__info-students'>
                    <Space>
                      <span>{students}</span>
                      <span>students</span>
                    </Space>
                  </div>
                </div>
                <div className='course-detail__intro-author'>
                  <span className=''>Author</span>
                  <Link to={`/user/${userId._id}`} className='course-detail__intro-author-name'>
                    {userId.name}
                  </Link>
                </div>
                <div className='course-detail__intro-updated-at'>Last updated {transformDate(updatedAt)}</div>
              </Col>
              <Col md={8}>
                <div className='course-detail__overview'>
                  <div className='course-detail__thumbnail'>
                    <img
                      src={thumbnail || 'https://img-c.udemycdn.com/course/240x135/3510096_5891.jpg'}
                      alt=''
                      className='course-detail__thumbnail-img'
                    />
                    <div className='course-detail__thumbnail-overlay'>
                      <RightCircleFilled className='course-detail__thumbnail-overlay-icon' />
                      <div className='course-detail__thumbnail-overlay-text'>
                        <span>Preview This course</span>
                      </div>
                    </div>
                  </div>
                  <div className='course-detail__overview-content'>
                    <div className='course-detail__overview-price'>{finalPrice === 0 ? 'FREE' : `$${finalPrice}`}</div>
                    <div className='course-detail__overview-btns'>
                      <Space>
                        {finalPrice !== 0 && (
                          <ButtonCmp
                            onClick={addCartHandler}
                            className='course-detail__overview-add-to-cart btn btn-md btn-secondary'
                          >
                            Add to Cart
                          </ButtonCmp>
                        )}
                        <Button className='course-detail__overview-wishlist-btn'>
                          <HeartOutlined />
                        </Button>
                      </Space>
                      <div>
                        <Space>
                          {finalPrice === 0 && (
                            <ButtonCmp
                              onClick={subscribeCourseHandler}
                              className='course-detail__overview-enroll-btn btn btn-md btn-primary'
                            >
                              Enroll now
                            </ButtonCmp>
                          )}
                          {finalPrice !== 0 && (
                            <ButtonCmp
                              onClick={buyNowHandler}
                              className='course-detail__overview-enroll-btn btn btn-md btn-primary'
                            >
                              Buy now
                            </ButtonCmp>
                          )}
                        </Space>
                      </div>
                      <div className='course-detail__overview-guarantee'>30-Day Money-Back Guarantee</div>
                    </div>
                    <div className='course-detail__overview-includes'>
                      <h4 className='course-detail__overview-includes-title'>This course includes:</h4>
                      <List
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        dataSource={overviewData}
                        renderItem={(item) => (
                          <List.Item>
                            <Typography.Text>+</Typography.Text> {item}
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Include section */}
        <div className='course-detail__includes spacing-h-sm container'>
          <Row>
            <Col md={16}>
              <div className='container course-detail__includes-wrap'>
                <List
                  header={<div className='course-detail__includes-header'>What you'll learn</div>}
                  footer={<div className='course-detail__includes-footer'>Show more</div>}
                  //   bordered
                  dataSource={courseData}
                  renderItem={(item) => (
                    <List.Item>
                      <Space>
                        <Typography.Text>
                          <CheckOutlined />
                        </Typography.Text>
                        <span>{item}</span>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* Content section */}
        <div className='course-detail__content container'>
          <Row>
            <Col md={16}>
              <h3 className='course-detail__content-title'>Course content</h3>
              <div className='course-detail__content-wrap'>
                <div className='course-detail__content-summary'>
                  <Row className='course-detail__content-summary-row'>
                    <Col md='12'>{numOfSections} sections • 243 lectures • 19h 44m total length</Col>
                    <Col className='course-detail__content-summary-col col-right' md='12'>
                      <Link to='/'>Expand all sections</Link>
                    </Col>
                  </Row>
                </div>
              </div>
              {/* Collapse section */}
              {courseId && <SectionList courseId={courseId} />}
            </Col>
          </Row>
        </div>

        {/* Course author */}

        <div className='course-detail__author spacing-h-md'>
          <div className='course-detail__author-wrap container'>
            <Row>
              <Col md={12} className='course-detail__author-info'>
                <p className='course-detail__author-intro'>Meet the intructor</p>
                <h2 className='course-detail__author-name'>{userId.name}</h2>
                <p className='course-detail__author-desc'>
                  Patrick Jones is a content marketing professional since 2002. He has a Masters Degree in Digital
                  Marketing and a Bachelors in Education and has been teaching marketing strategies for over 15 years in
                  Chicago. Patrick enjoys teaching all levels and all ages. He looks forward to sharing his love of
                  building meaningful and effective content with all students to develop their marketing abilities.
                </p>
              </Col>
              <Col md={12} className='course-detail__author-avatar'>
                <img
                  className='course-detail__author-img'
                  src={userId.avatar || 'https://www.w3schools.com/howto/img_avatar.png'}
                  alt={userId.name}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
