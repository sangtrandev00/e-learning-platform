import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { ICategory } from '../../../../../types/category.type';

const { Option } = Select;

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Omit<ICategory, '_id'>) => void;
}

const initialCategory: Omit<ICategory, '_id'> = {
  name: '',
  cateImage: '',
  cateSlug: '',
  description: ''
};

const CreateCategory: React.FC<CreateCategoryProps> = (props) => {
  const [formData, setFormData] = useState<Omit<ICategory, '_id'>>(initialCategory);

  return (
    <>
      <Drawer
        title='Create a new category'
        width={720}
        onClose={props.onClose}
        open={props.isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form layout='vertical' hideRequiredMark onFinish={() => props.onSubmit(formData)}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                <Input
                  value={formData.name}
                  placeholder='Please enter user name'
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='cateImage'
                label='Cate Image'
                rules={[{ required: true, message: 'Please enter cate image' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  // addonBefore='http://'
                  // addonAfter='.com'
                  value={formData.cateImage}
                  onChange={(event) => setFormData((prev) => ({ ...prev, cateImage: event.target.value }))}
                  placeholder='Please enter cate image'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='cateSlug'
                label='Cate Slug'
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder='Please enter your cate slug'
                  value={formData.cateSlug}
                  onChange={(event) => setFormData((prev) => ({ ...prev, cateSlug: event.target.value }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='type'
                label='Type'
                //  rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder='Please choose the type'>
                  <Option value='private'>Private</Option>
                  <Option value='public'>Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name='parentCate'
                label='Parent Category'
                // rules={[{ required: true, message: 'Please choose the parent Id' }]}
              >
                <Select placeholder='Please choose the parent category'>
                  <Option value='1'>parent 1</Option>
                  <Option value='2'>parent 2</Option>
                </Select>
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
                    message: 'please enter description'
                  }
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder='please enter  description'
                  value={formData.description}
                  onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateCategory;
