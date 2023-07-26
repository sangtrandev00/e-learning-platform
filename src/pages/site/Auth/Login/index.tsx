import React, { Fragment } from 'react';
import { Button, Checkbox, Divider, Form, Input, Space } from 'antd';
import ButtonCmp from '../../../../components/Button';
import { GoogleOutlined, FacebookOutlined, FacebookFilled, LinkedinFilled, GithubOutlined } from '@ant-design/icons';
import '../Auth.scss';
import { useLoginMutation } from '../../../auth.service';

const Login: React.FC = () => {
  const [login, loginResult] = useLoginMutation();

  const onFinish = (formValues: { email: string; password: string }) => {
    console.log('Success:', formValues);

    const userCredentials: { email: string; password: string } = {
      email: formValues.email,
      password: formValues.password
    };

    login(userCredentials)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        <Form.Item wrapperCol={{ span: 24 }} label='Email' name='email' rules={[{ type: 'email' }]}>
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
          <ButtonCmp className='btn btn-primary btn-sm w-full'>Login</ButtonCmp>
        </Form.Item>
      </Form>
      <div className='auth__footer'>
        <a href='' className='auth__footer-link'>
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
