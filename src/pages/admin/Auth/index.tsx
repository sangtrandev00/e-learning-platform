import React from 'react';
import AdminLogin from './Login';
import { Col, Row } from 'antd';
import './Auth.scss';
const AdminAuth = () => {
  return (
    <div className='admin-auth'>
      <Row>
        <Col md={8} offset={8}>
          <AdminLogin />
        </Col>
      </Row>
    </div>
  );
};

export default AdminAuth;
