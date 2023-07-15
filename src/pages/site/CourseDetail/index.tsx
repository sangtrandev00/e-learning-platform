import React from 'react';
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
import { Link } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
// type Props = {}
const courseData = [
  'Deploy a feature-complete app to production.',
  'Write integration and unit tests to ensure your code is working',
  'Use an API client to manually test your app.',
  'Make your code more reusable and testable with dependency injection.',
  'Get a behind-the-scenes understanding of NestJS.'
];

const overviewData = [
  '12 hours on-demand video',
  '3 articles.',
  '35 downloadable resources.',
  'Access on mobile and TV.',
  'Full lifetime access.',
  'Certificate of completion.'
];

const text = `
  Join community to learn the best of nestjs!
  
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Get Started Here',
    children: <p>{text}</p>
  },
  {
    key: '2',
    label: 'Basic of nest',
    children: <p>{text}</p>
  },
  {
    key: '3',
    label: 'Get Started with nest command line',
    children: <p>{text}</p>
  }
];

const CourseDetail = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
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

                <h2 className='course-detail__title'>NestJS: The Complete Developer's Guide</h2>
                <p className='course-detail__sub-title'>
                  Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes
                  testing and deployment!
                </p>
                <div className='course-detail__info'>
                  <div className='course-detail__info-item course-detail__info-status'>Bestseller</div>
                  <div className='course-detail__info-item course-detail__info-rating'>
                    <Space>
                      <span>4.5</span>
                      <span>
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                      </span>
                    </Space>
                  </div>
                  <div className='course-detail__info-item course-detail__info-students'>
                    <Space>
                      <span>12</span>
                      <span>students</span>
                    </Space>
                  </div>
                </div>
                <div className='course-detail__intro-author'>
                  <span className=''>Author</span>
                  <Link to='/' className='course-detail__intro-author-name'>
                    John Doe
                  </Link>
                </div>
              </Col>
              <Col md={8}>
                <div className='course-detail__overview'>
                  <div className='course-detail__thumbnail'>
                    <img
                      src='https://img-c.udemycdn.com/course/240x135/3510096_5891.jpg'
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
                    <div className='course-detail__overview-price'>₫1,699,000</div>
                    <div className='course-detail__overview-btns'>
                      <Space>
                        <ButtonCmp className='course-detail__overview-add-to-cart btn btn-md btn-secondary'>
                          Add to Cart
                        </ButtonCmp>
                        <Button className='course-detail__overview-wishlist-btn'>
                          <HeartOutlined />
                        </Button>
                      </Space>
                      <div>
                        <Space>
                          <ButtonCmp className='course-detail__overview-enroll-btn btn btn-md btn-primary'>
                            Enroll now
                          </ButtonCmp>
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
                    <Col md='12'>20 sections • 243 lectures • 19h 44m total length</Col>
                    <Col className='course-detail__content-summary-col col-right' md='12'>
                      <Link to='/'>Expand all sections</Link>
                    </Col>
                  </Row>
                </div>
              </div>
              {/* Collapse section */}
              <div className='course-detail__content-collapse'>
                <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
                <Button className='course-detail__content-collapse-btn'>
                  10 more section <DownOutlined />
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Course author */}

        <div className='course-detail__author spacing-h-md'>
          <div className='course-detail__author-wrap container'>
            <Row>
              <Col md={12} className='course-detail__author-info'>
                <p className='course-detail__author-intro'>Meet the intructor</p>
                <h2 className='course-detail__author-name'>Patrick Jones</h2>
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
                  src='https://cdn.mycourse.app/images/site-templates/fd6a2ef6babd1ba096b2e4b256df961e.jpeg'
                  alt=''
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
