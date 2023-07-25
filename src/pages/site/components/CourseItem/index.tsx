import { Badge, Col, Progress, Row } from 'antd';
import Button from '../../../../components/Button';
import './CourseItem.scss';
import { ICourse } from '../../../../types/course.type';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
type CourseItemProps = {
  courseItem: ICourse;
  courseState?: string;
  onClick: (_id: string) => void | ((e: React.MouseEvent<HTMLButtonElement>) => void);
};

// Generate style of course-item__img

const CourseItem = (props: CourseItemProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    // e.preventDefault();
    navigate(`/fsdfds`);
  };
  return (
    <Col onClick={() => props?.onClick(props.courseItem._id)} md={8}>
      <Badge.Ribbon text='Special Offer'>
        <div className='course-item'>
          <div
            className='course-item__img'
            style={{
              backgroundImage: `url(${props.courseItem.thumbnail || ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='course-item__content'>
            <h3 className='course-item__title course-item__title--courses-page'>{props.courseItem.name}</h3>
            <Progress className='course-item__process' percent={30} />
            <div className='course-item__desc'>{props.courseItem.description}</div>
            <div className='course-item__author'>
              <img
                src='https://lwfiles.mycourse.app/64b5524f42f5698b2785b91e-public/custom/500x0_98c893731f584cae4930e0d71df6c24d.jpeg'
                alt=''
                className='course-item__author-img'
              />
              <div className='course-item__author-name'>{props.courseItem.userId.name}</div>
            </div>
            <div className='course-item__enrolls'>
              <Row className='course-item__enrolls-row' justify='space-around' align='middle'>
                <Col md={12}>
                  <Button onClick={clickHandler} className='course-item__enrolls-btn btn btn-secondary btn-sm'>
                    {props.courseState === 'ordered' ? 'Continue' : 'Enroll'}
                  </Button>
                </Col>
                <Col md={12}>
                  <div className='course-item__prices'>
                    {props.courseItem.finalPrice === 0 ? (
                      <div className='course-item__prices-free'>FREE</div>
                    ) : (
                      <>
                        <span className='course-item__prices-old'>${props.courseItem.price}</span>
                        <span className='course-item__prices-new'>${props.courseItem.finalPrice}</span>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Badge.Ribbon>
    </Col>
  );
};

// generate default props for this component

CourseItem.defaultProps = {
  courseItem: {
    _id: '',
    name: '',
    thumbnail: '',
    description: '',
    price: 0,
    finalPrice: 0,
    userId: {
      _id: '',
      name: '',
      avatar: ''
    },
    createdAt: '',
    updatedAt: '',
    categoryId: {
      _id: '',
      name: ''
    }
  }
};
export default CourseItem;
