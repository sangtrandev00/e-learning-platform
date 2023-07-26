import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useAddUserMutation } from '../../user.service';
import { IUser } from '../../../../../types/user.type';

const { Option } = Select;

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUser: React.FC<AddUserProps> = (props) => {
  const [addUser, addUserResult] = useAddUserMutation();

  const submitHandler = (formData: Omit<IUser, '_id'>) => {
    console.log('submit', formData);

    const newUser: Omit<IUser, '_id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role
    };

    addUser(newUser)
      .then((result) => {
        console.log(result);
        props.onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Drawer
        title='Create a new account'
        width={820}
        onClose={props.onClose}
        open={props.isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
          </Space>
        }
      >
        <Row>
          <Col md={8}></Col>

          <Col md={16}>
            <Form layout='vertical' hideRequiredMark onFinish={submitHandler}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter user name' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='email'
                    label='Email'
                    rules={[{ required: true, message: 'Please enter your email' }]}
                  >
                    <Input style={{ width: '100%' }} addonAfter='.com' placeholder='Please enter email' />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name='phone' label='phone'>
                    <Input placeholder='Enter your phone' />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name='role' label='Role' rules={[{ required: true, message: 'Please select an owner' }]}>
                    <Select placeholder='Please select a role'>
                      <Option value='ADMIN'>ADMIN</Option>
                      <Option value='USER'>USER</Option>
                      <Option value='INSTRUCTOR'>INSTRUCTOR</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='courses'
                    label='Select a course'
                    rules={[{ required: true, message: 'Please choose the type' }]}
                  >
                    <Select placeholder='Courses want to enroll'>
                      <Option value='private'>HTML CSS</Option>
                      <Option value='public'>Javascript</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='price' label='Price' rules={[{ required: true, message: 'Please choose the type' }]}>
                    <Input placeholder='Price' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='type' label='Type' rules={[{ required: true, message: 'Please choose the type' }]}>
                    <Select placeholder='Please choose the type'>
                      <Option value='private'>Private</Option>
                      <Option value='public'>Public</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name='Tags' label='Tags' rules={[{ required: true, message: 'Please choose the Tags' }]}>
                    <Select placeholder='Please choose the Tags'>
                      <Option value='jack'>Backend dev</Option>
                      <Option value='tom'>Frontend dev</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Add User
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AddUser;
