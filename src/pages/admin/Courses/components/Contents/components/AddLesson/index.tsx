import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Radio, Row, Select, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ILesson } from '../../../../../../../types/lesson.type';
const { Option } = Select;

type AddLessonProps = {
  onSubmit: (formData: Omit<ILesson, '_id'>) => void;
};

// const initialSection: Omit<ISection, '_id'> = {
//   name: '',
//   courseId: '',
//   description: ''
// };

const AddLesson: React.FC<AddLessonProps> = (props) => {
  const [open, setOpen] = useState(false);

  // const [formData, setFormData] = useState<Omit<ISection, '_id'>>(initialSection);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState('FREE');

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Add New Lesson
      </Button>
      <Drawer
        title='Lesson Edit'
        width={812}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Row>
          <Col md={8}></Col>
          <Col md={16}>
            {/* Form maybe cange layter */}
            <Form layout='vertical' hideRequiredMark onFinish={props.onSubmit}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter the section name here' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='content'
                    label='Link Youtube'
                    rules={[{ required: true, message: 'Please enter link youtube' }]}
                  >
                    <Input placeholder='Please enter link youtube' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='access' label='Access' rules={[{ required: true, message: 'Please enter url' }]}>
                    <Radio.Group onChange={onChange} value={value}>
                      <Space direction='vertical'>
                        <Radio value='DRAFT'>DRAFT</Radio>
                        <Radio value='SOON'>SOON</Radio>
                        <Radio value='FREE'>FREE</Radio>
                        <Radio value='PAID'>PAID</Radio>
                        {/* <Radio value={4}>
                          More...
                          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                        </Radio> */}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name='approver'
                    label='Approver'
                    rules={[{ required: true, message: 'Please choose the approver' }]}
                  >
                    <Select placeholder='Please choose the approver'>
                      <Option value='jack'>Jack Ma</Option>
                      <Option value='tom'>Tom Liu</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='dateTime'
                    label='DateTime'
                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={(trigger) => trigger.parentElement!}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name='description'
                    label='Description'
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description'
                      }
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder='please enter url description' />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AddLesson;
