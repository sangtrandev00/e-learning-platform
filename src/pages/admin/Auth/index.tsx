import { Col, Row } from 'antd';
import './Auth.scss';
import AdminLogin from './Login';
const AdminAuth = () => {
  return (
    <div className='admin-auth'>
      <h2 className='admin-auth__title text-center text-2xl mb-4'>Admin Login from E Learning</h2>
      <Row>
        <Col md={8} offset={8}>
          <AdminLogin />
        </Col>
      </Row>
    </div>
  );
};

export default AdminAuth;
