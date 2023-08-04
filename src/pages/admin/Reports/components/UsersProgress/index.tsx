import { Col, Row } from 'antd';
import React from 'react';

const UsersProgress = () => {
  return (
    <div className='users-progress'>
      <div className='users-progress__wrap'>
        <Row className='users-progress__row' gutter={16}>
          <Col className='users-progress__col users-progress__select-course' md={12}>
            <h3 className='users-progress__select-course-title'>Select a course</h3>
          </Col>
          <Col md={12}></Col>
        </Row>
      </div>
    </div>
  );
};

export default UsersProgress;
