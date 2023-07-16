import { Col, Row } from 'antd';
import React from 'react';
import ButtonCmp from '../../../components/Button';
import { ReadOutlined } from '@ant-design/icons';
import CourseItem from '../components/CourseItem';
import CourseList from '../components/CourseList';
import './StartLearning.scss';
// type Props = {};

const StartLearning = () => {
  const moveToDetail = () => {
    console.log('move');
  };

  return (
    <div className='start-learning'>
      <div className='start-learning__wrap'>
        <div className='start-learning__header spacing-h-md container'>
          <Row className='start-learning__header-row'>
            <Col md={12}>
              <div className='start-learning__header-welcome'>
                <div className='start-learning__header-welcome-icon'>
                  <img
                    src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/avatars/648eaf1c0c0c35ee7db7e0a3.jpg?version=2023-07-16%2010%3A02%3A03'
                    alt=''
                    className='start-learning__header-welcome-img'
                  />
                </div>
                <div className='start-learning__header-welcome-info'>
                  <div className='start-learning__header-welcome-text'>HI,</div>
                  <div className='start-learning__header-welcome-name'>Tran Nhat Sang</div>
                  <div className='start-learning__header-welcome-view-profile'>
                    <ButtonCmp className='btn btn-sm btn-outline-primary'>Visit profile</ButtonCmp>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className='start-learning__header-summary'>
                <Row className='start-learning__header-summary-row'>
                  <Col md={8}>
                    <div className='start-learning__header-summary-item start-learning__header-summary-item--courses'>
                      <div className='start-learning__header-summary-item-icon'>
                        <ReadOutlined />
                      </div>
                      <div className='start-learning__header-summary-item-number'>3</div>
                      <div className='start-learning__header-summary-item-text'>Courses</div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className='start-learning__header-summary-item start-learning__header-summary-item--messages'>
                      <div className='start-learning__header-summary-item-icon'>
                        <ReadOutlined />
                      </div>
                      <div className='start-learning__header-summary-item-number'>0</div>
                      <div className='start-learning__header-summary-item-text'>Messages</div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className='start-learning__header-summary-item start-learning__header-summary-item--hours'>
                      <div className='start-learning__header-summary-item-icon'>
                        <ReadOutlined />
                      </div>
                      <div className='start-learning__header-summary-item-number'>13</div>
                      <div className='start-learning__header-summary-item-text'>Hours</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <div className='start-learning__courses spacing-h-md'>
          <div className='start-learning__courses-wrap container'>
            <h2 className='start-learning__courses-heading'>Courses</h2>
            <div className='start-learning__courses-list'>
              <CourseList className='start-learning__courses-row' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLearning;
