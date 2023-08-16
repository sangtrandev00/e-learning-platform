import { Button, Col, Drawer, Form, Input, Row, Select, Space, notification } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { ICategory } from '../../../../../types/category.type';
import { CategoryError } from '../../../../../utils/helpers';
import { useAddCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from '../../category.service';

const { Option } = Select;

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = (props) => {
  const [addCategory, addCategoryResult] = useAddCategoryMutation();
  const [updateCategory, updateCategoryResult] = useUpdateCategoryMutation();

  const [form] = Form.useForm();
  const categoryId = useSelector((state: RootState) => state.category.categoryId);
  const { data, isFetching } = useGetCategoryQuery(categoryId);

  console.log('cate detail:', data);

  // const initialCategory: ICategory = {
  //   _id: props.cateId,
  //   name: data?.category.name || '',
  //   cateImage: data?.category.cateImage || '',
  //   cateSlug: data?.category.cateSlug || '',
  //   description: data?.category.description || ''
  // };

  const initialCategory: ICategory = useMemo(
    () => ({
      _id: categoryId,
      name: data?.category.name || '',
      cateImage: data?.category.cateImage || '',
      cateSlug: data?.category.cateSlug || '',
      description: data?.category.description || ''
    }),
    [categoryId, data]
  );

  const [formData, setFormData] = useState<ICategory>(initialCategory);

  console.log('init cate: ', initialCategory);
  console.log('form data: ', formData);

  useEffect(() => {
    // const formData = {
    //   _id: props.cateId,
    //   name: data?.category.name,
    //   cateImage: data?.category.cateImage,
    //   cateSlug: data?.category.cateSlug,
    //   description: data?.category.description
    // };
    // console.log(formData);

    console.log('categoryId: ', categoryId);

    if (categoryId && data) {
      setFormData(initialCategory);
      form.setFieldsValue(initialCategory);
    } else {
      console.log('Add state');
      setFormData({
        _id: '',
        name: '',
        cateImage: '',
        cateSlug: '',
        description: ''
      });
      form.setFieldsValue({
        _id: '',
        name: '',
        cateImage: '',
        cateSlug: '',
        description: ''
      });

      // form.resetFields();
    }

    return () => {
      // form.resetFields();
      // console.log('Unmount data: ');
    };
  }, [categoryId, data, form]);

  const submitHandler = (formData: Omit<ICategory, '_id'>) => {
    console.log('submit', formData);

    const updatedCategory = {
      _id: categoryId,
      ...formData
    };

    if (categoryId) {
      console.log('updated cate: ', updatedCategory);
      props.onClose();
      updateCategory(updatedCategory)
        .then((result) => {
          console.log('update success', result);

          notification.success({
            message: 'Update Category successfully',
            description: 'Update Category successfully hihi',
            duration: 2
          });
        })
        .catch((error: CategoryError) => {
          console.log('error: ', error);

          notification.error({
            message: 'Update Category failed',
            description: error.data.message
          });
        });
    } else {
      addCategory(formData)
        .unwrap()
        .then((result) => {
          console.log(result);
          props.onClose();
          notification.success({
            message: 'Add category successfully!',
            description: result.message
          });
        })
        .catch((error: { status: number; data: { message: string; errorType: string } }) => {
          console.log('error: ', error);

          notification.error({
            message: 'Add category failed',
            description: error.data.message
          });
        });
      console.log(addCategoryResult);
    }
  };

  return (
    <>
      <Drawer
        title={categoryId ? 'Edit Category' : 'Create a new Category'}
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
        <Form
          form={form}
          name='basic'
          layout='vertical'
          hideRequiredMark
          onFinish={submitHandler}
          initialValues={{
            name: formData.name,
            cateImage: formData.cateImage,
            cateSlug: formData.cateSlug,
            description: formData.description
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter category name' }]}>
                <Input
                  name='name'
                  value={formData.name}
                  placeholder='Please enter category name'
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
                  name='cateImage'
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
                  name='cateSlug'
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
                  name='description'
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
