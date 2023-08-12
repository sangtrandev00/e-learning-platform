import { Button, Checkbox, Form, Input, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../../../types/user.type';
import { adminLoginError } from '../../../../utils/helpers';
import { useAdminLoginMutation } from '../../../auth.service';
import { setAdminAuthenticated } from '../../../auth.slice';

const AdminLogin: React.FC = () => {
  const [form] = Form.useForm();
  const [adminLogin, adminLoginResult] = useAdminLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (formValues: { email: string; password: string }) => {
    console.log('Success:', formValues);

    const adminCredentials: { email: string; password: string } = {
      email: formValues.email,
      password: formValues.password
    };

    adminLogin(adminCredentials)
      .then((result) => {
        console.log(result);

        if ('data' in result) {
          console.log(result.data);

          const loginResponse: { token: string; message: string; userId: string } = result.data;
          const decodedToken: { exp: number; iat: number; userId: string; email: string; adminRole: UserRole } =
            jwtDecode(loginResponse.token);

          localStorage.setItem('adminToken', loginResponse.token);
          const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
          console.log(decodedToken);

          // Check if the token has not expired
          if (Date.now() < expirationTime) {
            // Token is valid, dispatch action to set authentication state
            dispatch(setAdminAuthenticated(loginResponse.token));
            form.resetFields();
            notification.success({ type: 'success', message: loginResponse.message, duration: 2 });

            navigate('/author/dashboard');
          } else {
            // Token has expired, handle accordingly (e.g., prompt user to log in again)
            console.log('Token has expired. Please log in again.');
          }
        }

        // Handling error failed login here
        if ('error' in result) {
          if ('status' in result.error) {
            console.log('show notification!');

            notification.error({
              message: 'Login failed',
              description: (result as adminLoginError).error.data.message
            });
          }
        }
        // if (result.error.status === 500) {
        //   console.log('show notification!');
        // }
      })
      .catch((error: adminLoginError) => {
        console.log(error);

        notification.error({
          message: 'Login failed',
          description: error.error.data.message
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminLogin;
