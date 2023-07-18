import { Avatar, Card, Col, Divider, Row } from 'antd';

import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
const { Meta } = Card;

type CourseItemProps = {
  xs?: number;
  md?: number;
  lg?: number;
};

import './CourseItem.scss';

const CourseItem = (props: CourseItemProps) => {
  return (
    <Col className='course-content__item' md={props.md}>
      <Card
        style={{ width: 300 }}
        cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        actions={[<SettingOutlined key='setting' />, <EditOutlined key='edit' />, <EllipsisOutlined key='ellipsis' />]}
      >
        <Meta
          avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />}
          title='HTML, CSS'
          description='This is the description of this course'
        />
        <Divider />
        <Row>
          <Col className='' span={12}>
            <div>Price</div>
            <div>$30 $2</div>
          </Col>
          <Col className='' span={12}>
            <div>Learner</div>
            <div>1</div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default CourseItem;
