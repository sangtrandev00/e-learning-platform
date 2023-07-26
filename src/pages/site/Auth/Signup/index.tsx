import React, { Fragment } from 'react';
import { Button, Checkbox, Divider, Form, Input, Space } from 'antd';
import ButtonCmp from '../../../../components/Button';
import { GoogleOutlined, FacebookOutlined, FacebookFilled, LinkedinFilled, GithubOutlined } from '@ant-design/icons';
import '../Auth.scss';
import { useSignupMutation } from '../../../auth.service';
import { IUser, UserRole } from '../../../../types/user.type';

interface SignupProps {
  onClick: (authState: string) => void;
}

const Signup: React.FC<SignupProps> = (props) => {
  const [signup, signupResult] = useSignupMutation();

  const onFinish = (formValues: Omit<IUser, '_id'>) => {
    console.log('Success:', formValues);

    const newUser: Omit<IUser, '_id'> = {
      email: formValues.email,
      password: formValues.password,
      name: formValues.name,
      phone: formValues.name,
      role: UserRole.USER
    };

    signup(newUser)
      .then((result) => {
        console.log(result);

        props.onClick('login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    props.onClick('login');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Signup or sign up to start learning</h2>
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
        <Form.Item wrapperCol={{ span: 24 }} label='Fullname' name='name' rules={[{ required: true }]}>
          <Input className='' />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} label='Email' name='email' rules={[{ required: true, type: 'email' }]}>
          <Input className='' />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} label='Phone' name='phone' rules={[{ required: true }]}>
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
          <ButtonCmp className='btn btn-primary btn-sm w-full'>Signup</ButtonCmp>
        </Form.Item>
      </Form>
      <div className='auth__footer'>
        <a onClick={clickHandler} className='auth__footer-link'>
          Login
        </a>
      </div>
    </Fragment>
  );
};

export default Signup;
