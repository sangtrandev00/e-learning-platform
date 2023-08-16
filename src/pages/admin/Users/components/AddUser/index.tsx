import { Button, Col, Drawer, Form, Input, Row, Select, Space, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IUser, UserRole } from '../../../../../types/user.type';
import { UserError } from '../../../../../utils/helpers';
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation } from '../../user.service';

const { Option } = Select;

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState: IUser = {
  _id: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  role: UserRole.USER
};

const AddUser: React.FC<AddUserProps> = (props) => {
  const [formData, setFormData] = useState<IUser>(initialState);
  const [addUser, addUserResult] = useAddUserMutation();
  const [updateUser, updateUserResult] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.user.userId);

  const { data } = useGetUserQuery(userId, {
    skip: !userId
  });

  const submitHandler = (formData: Omit<IUser, '_id'>) => {
    console.log('submit', formData);

    const newUser: Omit<IUser, '_id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      avatar: formData.avatar,
      password: formData.password
    };

    if (userId) {
      console.log('update user');

      updateUser({
        _id: userId,
        body: newUser
      })
        .unwrap()
        .then((result) => {
          console.log('result: ', result);
          props.onClose();

          notification.success({
            message: 'Update User',
            description: 'Update user successfully!'
          });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } else {
      addUser(newUser)
        .then((result) => {
          console.log(result);
          props.onClose();
          notification.success({
            message: 'Add User',
            description: 'Add user successfully!'
          });
          // if(result.status === 401) {
          //   notification.error({
          //     message: 'Add User',
          //     description: 'Add user failed!'
          //   });
          // }else {

          // }
        })
        .catch((error: UserError) => {
          console.log(error);

          notification.error({
            message: 'Add User failed',
            description: error.data.message
          });
        });
    }
  };

  useEffect(() => {
    if (data && userId) {
      setFormData(data.user);
      form.setFieldsValue(data.user);
    } else {
      // setFormData(initialState);
      form.setFieldsValue({
        _id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        avatar: '',
        role: UserRole.USER
      });
    }
  }, [data, form, userId]);

  return (
    <>
      <Drawer
        title={userId ? 'Edit User' : 'Add a new User'}
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
            <Form form={form} layout='vertical' hideRequiredMark onFinish={submitHandler}>
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
                  <Form.Item name='phone' label='Phone'>
                    <Input placeholder='Enter your phone' />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name='role' label='Role' rules={[{ required: true, message: 'Please select an owner' }]}>
                    <Select placeholder='Please select a role'>
                      <Option value='ADMIN'>ADMIN</Option>
                      <Option value='USER'>USER</Option>
                      <Option value='TEACHER'>TEACHER</Option>
                      <Option value='INSTRUCTOR'>INSTRUCTOR</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='avatar' label='Avatar'>
                    <Input placeholder='Your avatar' />
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

                  <Form.Item
                    name='password'
                    label='Password'
                    rules={[{ required: true, message: 'Please enter the password' }]}
                  >
                    <Input.Password type='password' placeholder='password' />
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
                  Save
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
