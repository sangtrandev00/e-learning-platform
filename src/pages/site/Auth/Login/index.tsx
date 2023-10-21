import { FacebookFilled, GithubOutlined, GoogleOutlined, LinkedinFilled, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Spin, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCmp from '../../../../components/Button';
import { useLoginMutation, useUpdateLastLoginMutation } from '../../../auth.service';
import { closeAuthModal, setAuthenticated } from '../../../auth.slice';
import '../Auth.scss';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
interface LoginProps {
  onClick: (authState: string) => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const [form] = Form.useForm();
  const [login, loginResult] = useLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [updateLastLogin] = useUpdateLastLoginMutation();

  const onFinish = (formValues: { email: string; password: string }) => {
    const userCredentials: { email: string; password: string } = {
      email: formValues.email,
      password: formValues.password
    };

    setIsSubmitting(true);
    login(userCredentials)
      .then((result) => {
        // if(result.error) {
        //   notification.error({ type: 'error', message: result.error.data.message, duration: 2 });
        // }
        if ('error' in result) {
          notification.error({ type: 'error', message: 'login failed', description: 'Email or password incorrect' });
        }

        if ('data' in result) {
          const loginResponse: { token: string; message: string; userId: string } = result.data;
          const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(
            loginResponse.token
          );

          // Update last login at database
          const currentDate = new Date();
          updateLastLogin({
            userId: decodedToken.userId,
            lastLogin: currentDate
          })
            .unwrap()
            .then(() => {
              notification.success({ type: 'success', message: 'update last login successully!', duration: 2 });
            })
            .catch((error) => {
              console.log('error: ', error);
            });

          localStorage.setItem('token', loginResponse.token);
          const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

          // Check if the token has not expired
          if (Date.now() < expirationTime) {
            // Token is valid, dispatch action to set authentication state
            dispatch(setAuthenticated(loginResponse.token));
            dispatch(closeAuthModal());
            form.resetFields();
            notification.success({ type: 'success', message: loginResponse.message, duration: 2 });
          } else {
            // Token has expired, handle accordingly (e.g., prompt user to log in again)
            console.log('Token has expired. Please log in again.');
          }
        }

        if (!loginResult.isLoading) {
          setIsSubmitting(false);
        }

        // Handling error failed login here
        // if ('error' in result) {
        //   if ('status' in result.error) {
        //     console.log('show notification!');
        //   }
        // }
        // if (result.error.status === 500) {
        //   console.log('show notification!');
        // }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const navigateLoginHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick('signup');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Login or sign up to start learning</h2>
      </div>
      <div className='auth__socials'>
        <Space>
          <Button className='auth__socials-btn'>
            <GoogleOutlined className='auth__socials-icon' />
          </Button>
          <Button className='auth__socials-btn'>
            <FacebookFilled className='auth__socials-icon' />
          </Button>
          <Button className='auth__socials-btn'>
            <LinkedinFilled className='auth__socials-icon' />
          </Button>
          <Button className='auth__socials-btn'>
            <GithubOutlined className='auth__socials-icon' />
          </Button>
        </Space>
      </div>

      <Divider>Or</Divider>

      <Form
        form={form}
        name='basic'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item wrapperCol={{ span: 24 }} label='Email' name='email' rules={[{ type: 'email', required: true }]}>
          <Input className='' />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='' />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <ButtonCmp disabled={isSubmitting} className='btn btn-primary btn-sm w-full'>
            {isSubmitting ? <Spin indicator={antIcon} /> : 'Login '}
          </ButtonCmp>
          {/* <Button loading={true}>
            Submit Ant Design <Spin indicator={antIcon} />;
          </Button> */}
        </Form.Item>
      </Form>
      <div className='auth__footer'>
        <a onClick={navigateLoginHandler} href='#' className='auth__footer-link'>
          Create Account
        </a>
        <a href='' className='auth__footer-link'>
          Forgot Password
        </a>
      </div>
    </Fragment>
  );
};

export default Login;
