import { PlusOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Button, Col, Drawer, Form, Input, Radio, Row, Space, notification } from 'antd';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { ILesson } from '../../../../../../../types/lesson.type';
import { formatTime } from '../../../../../../../utils/functions';
import { useAddLessonMutation } from '../../../../course.service';

type AddLessonProps = {
  // onSubmit: (formData: Omit<ILesson, '_id'>) => void;
  // videoLength?: number;
  // onCloseActivies: () => void;
};

const AddLesson: React.FC<AddLessonProps> = () => {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [contentLink, setContentLink] = useState('');
  const [form] = Form.useForm();
  // const [formData, setFormData] = useState<Omit<ISection, '_id'>>(initialSection);
  const [addLesson, addLessonResult] = useAddLessonMutation();

  const sectionId = useSelector((state: RootState) => state.course.sectionId);

  const showDrawer = () => {
    // props.onCloseActivies();

    // Close section add activities --> Add later
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState('FREE');

  const onChange = (e: RadioChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const onChangeVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentLink(e.target.value);
  };

  const onPasteVideoLink = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log(e.clipboardData.getData('text'));
    setContentLink(e.clipboardData.getData('text'));
  };

  const onFinish = (formData: Omit<ILesson, '_id'>) => {
    console.log(formData);
    console.log(playerRef.current?.getDuration());
    console.log(formatTime(playerRef.current?.getDuration() || 0));

    const lessonData: Omit<ILesson, '_id'> = {
      name: formData.name,
      content: formData.content,
      access: formData.access,
      sectionId: sectionId,
      type: 'video',
      description: formData.description,
      videoLength: playerRef.current?.getDuration() || 0
    };

    addLesson(lessonData)
      .unwrap()
      .then((result) => {
        console.log(result);

        notification.success({
          message: 'Add lesson successfully',
          duration: 2
        });

        setOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(addLessonResult);
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
            <Form form={form} layout='vertical' hideRequiredMark onFinish={onFinish}>
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
                    <Input
                      onPaste={onPasteVideoLink}
                      onChange={onChangeVideoLink}
                      // onChange={calcVideoLength}
                      placeholder='Please enter link youtube'
                    />
                  </Form.Item>
                  {/* <span>Video length: 30 minutes</span> */}
                  <ReactPlayer
                    ref={playerRef}
                    url={contentLink}
                    width={0}
                    height={0}
                    // onDuration={handleDuration}
                    config={{
                      youtube: {
                        playerVars: {
                          controls: 0,
                          modestbranding: 1,
                          showinfo: 0,
                          fs: 0
                        }
                      }
                    }}
                  />
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

export default AddLesson;
