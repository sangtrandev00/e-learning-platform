import { Col, Progress, Row } from 'antd';
import Button from '../../../../components/Button';
import './CourseItem.scss';
type CourseItemProps = {
  id?: string;
  avatar?: string;
  name?: string;
  process?: number;
  price?: number;
  discount?: number;
  onClick: (id: string) => void;
};

// Generate style of course-item__img

const CourseItem = (props: CourseItemProps) => {
  return (
    <Col onClick={() => props?.onClick(props.id as string)} md={8}>
      <div className='course-item'>
        <div
          className='course-item__img'
          style={{
            backgroundImage: `url(${props.avatar || ''})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className='course-item__content'>
          <h3 className='course-item__title'>{props.name}</h3>
          <Progress className='course-item__process' percent={props.process || 30} />
          <div className='course-item__desc'>content machine learning A - Z</div>
          <div className='course-item__enrolls'>
            <Row className='course-item__enrolls-row' justify='space-around' align='middle'>
              <Col md={12}>
                <Button className='course-item__enrolls-btn btn btn-secondary btn-sm'>Enroll</Button>
              </Col>
              <Col md={12}>
                <div className='course-item__prices'>
                  <span className='course-item__prices-old'>$20</span>
                  <span className='course-item__prices-new'>$3</span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Col>
  );
};

// generate default props for this component

CourseItem.defaultProps = {
  id: '32',
  avatar:
    'https://api.us-e2.learnworlds.com/imagefile/https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/108ae32aaacf8712b9900919ee977d70.jpeg?client_id=648eaf1c0c0c35ee7db7e0a2&width=400&height=0',
  name: 'Master SEO',
  process: 100,
  price: '',
  discount: ''
};
export default CourseItem;
