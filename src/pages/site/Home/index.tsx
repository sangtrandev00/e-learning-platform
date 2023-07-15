import './Home.scss';
import Button from '../../../components/Button';
import { Col, Row, Space } from 'antd';
import {
  EditOutlined,
  UserOutlined,
  FlagOutlined,
  FundFilled,
  DingtalkOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import CourseItem from '../components/CourseItem';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div>
      <div className='banner'>
        <div className='banner__wrapper'>
          <div className='banner__wrapper-left'>
            <div className='banner__cta-section'>
              <h1 className='banner__title'>Learn and become better at your job</h1>
              <p className='banner__content'>
                Participate in a fully professional, social, engaging and interactive online school. Get the learning
                experience you deserve.
              </p>
              <div className='banner__cta--btns'>
                <Space>
                  <Button className='banner__cta-start-now btn btn-md btn-secondary'>Start Now</Button>
                  <Link to='/courses'>
                    <Button className='btn btn-md btn-tertiary'>View Courses</Button>
                  </Link>
                </Space>
              </div>
            </div>
          </div>
          <div className='banner__wrapper-right'></div>
        </div>
      </div>
      <div className='our-benefits spacing-h-md '>
        <div className='container'>
          <h2 className='our-benefits__title'>Benefits of our training programs</h2>
          <p className='our-benefits__sub-tittle'>
            The best instructors have designed the most motivating learning paths for you.
          </p>
          <div className='our-benefits__list'>
            <div className='our-benefits__item'>
              <div className='our-benefits__item-img'>
                <EditOutlined className='our-benefits__item-icon' />
              </div>
              <h3 className='our-benefits__item-title'>Practical approach</h3>
              <p className='our-benefits__item-content'>
                Our training is designed to provide the skills in a practical approach. Our students' success is our
                best asset in showing the quality of our training.
              </p>
            </div>
            <div className='our-benefits__item'>
              <div className='our-benefits__item-img'>
                <ApartmentOutlined className='our-benefits__item-icon' />
              </div>
              <h3 className='our-benefits__item-title'>Globally oriented</h3>
              <p className='our-benefits__item-content'>
                Strategies shared and knowledge earned allows our students to immediately set up their business and
                start offering their services around the globe.
              </p>
            </div>
            <div className='our-benefits__item'>
              <div className='our-benefits__item-img'>
                <DingtalkOutlined className='our-benefits__item-icon' />
              </div>
              <h3 className='our-benefits__item-title'>For your career</h3>
              <p className='our-benefits__item-content'>
                Whether you want to boost your career within the company you are working or grow at your own business by
                applying the latest strategies in digital marketing, this is the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='statistics spacing-h-md '>
        <Row className='statistics__list container'>
          <Col className='statistics__item' md={8}>
            <div className='statistics__item-img'>
              <UserOutlined className='statistics__item-icon' />
            </div>
            <h3 className='statistics__item-number'>19,200</h3>
            <p className='statistics__item-content'>STUDENTS</p>
          </Col>
          <Col className='statistics__item' md={8}>
            <div className='statistics__item-img'>
              <FlagOutlined className='statistics__item-icon' />
            </div>
            <h3 className='statistics__item-number'>92.000</h3>
            <p className='statistics__item-content'>LEARNING STEPS DONE</p>
          </Col>
          <Col className='statistics__item' md={8}>
            <div className='statistics__item-img'>
              <FundFilled className='statistics__item-icon' />
            </div>
            <h3 className='statistics__item-number'>80%</h3>
            <p className='statistics__item-content'>COURSE COMPLETION RATE</p>
          </Col>
        </Row>
      </div>

      {/* Quotes  */}
      <div className='quotes spacing-h-lg'>
        <div className='quotes__wrapper'>
          <div className='quotes__author'>
            <div className='quotes__author-img-cover'>
              <div className='quotes__author-img'></div>
            </div>
            <div className='quotes__author-content'>
              <h3 className='quotes__author-content-title'>Get Closer To Your Goals</h3>
              <p className='quotes__author-content-text'>
                Are you feeling overwhelmed by the explosion of digital platforms and channels? Are you unsure how to
                best navigate this new environment to engage even more successfully with your colleagues?
              </p>
              <p className='quotes__author-content-text'>
                Studying with us will help you learn how to create, capture and deliver value in a digital world. You'll
                leave with smart strategies to optimize your performance and satisfaction both online AND offline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}

      <div className='our-courses container spacing-h-md'>
        <h2 className='our-courses__title'>Our Courses</h2>
        <Row gutter={16} className='our-courses__wrapper'>
          <CourseItem />
          <CourseItem />
          <CourseItem />
        </Row>

        <div className='our-courses__btn-place'>
          <Button className='btn btn-secondary btn-sm'>Load more</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
