import { PlusOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Button, Col, Drawer, Form, Input, Radio, Row, Select, Space, notification } from 'antd';
import React, { useState } from 'react';
import { ISection } from '../../../../../../../types/lesson.type';
import { useAddSectionMutation } from '../../../../course.service';
const { Option } = Select;

type AddSectionProps = {
  // onSubmit: (formData: Omit<ISection, '_id'>) => void;
  courseId: string;
};

// const initialSection: Omit<ISection, '_id'> = {
//   name: '',
//   courseId: '',
//   description: ''
// };

const AddSection: React.FC<AddSectionProps> = (props) => {
  const [addSection, addSectionResult] = useAddSectionMutation();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

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

  const submitHandler = (formData: Omit<ISection, '_id'>) => {
    console.log(formData);

    if (props.courseId) {
      const data = {
        name: formData.name,
        access: formData.access,
        courseId: props.courseId,
        description: formData.description
      };
      addSection(data)
        .unwrap()
        .then((res) => {
          console.log(res);
          notification.success({
            message: 'Add section successfully',
            description: 'You can start adding lesson to this section',
            duration: 2
          });
          form.resetFields();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      throw Error('Course id is not exist');
    }
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Add Section
      </Button>
      <Drawer
        title='Section Edit'
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
            <Form form={form} layout='vertical' hideRequiredMark onFinish={submitHandler}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter the section name here' />
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
                {/* <Col span={12}>
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
                </Col> */}
                {/* <Col span={12}>
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
                </Col> */}
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

export default AddSection;
