import { Col, Row } from 'antd';
import './Auth.scss';
import AdminLogin from './Login';
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
