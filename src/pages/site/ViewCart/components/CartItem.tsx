import { StarFilled, TagOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Skeleton, Space } from 'antd';
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccessStatus, CourseLevel, ICourse } from '../../../../types/course.type';
import { useGetCourseQuery } from '../../client.service';
import './CartItem.scss';

type CartItemProps = {
  courseId: string;
  onTotal: (finalPrice: number) => void;
  onRemove: (courseId: string) => void;
};

const CartItem = (props: CartItemProps) => {
  const { courseId } = props;

  const { data, isFetching } = useGetCourseQuery(courseId);

  console.log(data);

  let courseData: ICourse = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    finalPrice: 0,
    access: AccessStatus.FREE,
    level: CourseLevel.BEGINNER,
    thumbnail: '',
    courseSlug: '',
    categoryId: {
      _id: '646781266859a50acfca8e93',
      name: 'Web'
    },
    userId: {
      _id: '6468a145401d3810494f4797',
      name: 'Nguyen Van A',
      avatar: ''
    }
  };

  if (data) {
    courseData = data.course;
  }

  const { _id, name, finalPrice, thumbnail, userId: author } = courseData;

  useEffect(() => {
    props.onTotal(finalPrice);
  }, [finalPrice, props]);

  // useEffect(() => {}, []);

  return (
    <Fragment>
      {isFetching && <Skeleton />}
      {!isFetching && (
        <div className='view-cart__list-item'>
          <Divider className='view-cart__list-item-divider' />
          <Row>
            <Col md={4}>
              <Link to={`/courses/${_id}`} className='view-cart__list-item-thumb'>
                <img src={thumbnail} alt='' className='view-cart__list-item-img' />
              </Link>
            </Col>
            <Col md={12}>
              <div className='view-cart__list-item-info'>
                <Link to={`/courses/${_id}`} className='view-cart__list-item-info-line view-cart__list-item-info-name'>
                  {name}
                </Link>
                <p className='view-cart__list-item-info-line view-cart__list-item-info-author'>
                  By <Link to={`/user/${author._id}`}>{author.name}</Link> and 1 other
                </p>
                <div className='view-cart__list-item-info-line view-cart__list-item-info-rating'>
                  <div className='info-rating'>
                    <div className='info-rating__point'>4.4</div>
                    <div className='info-rating__icons'>
                      <StarFilled className='info-rating__icons-item' />
                      <StarFilled className='info-rating__icons-item' />
                      <StarFilled className='info-rating__icons-item' />
                      <StarFilled className='info-rating__icons-item' />
                      <StarFilled className='info-rating__icons-item' />
                    </div>
                    <div className='info-rating__ratings'>(841 ratings)</div>
                  </div>
                </div>
                <div className='view-cart__list-item-info-line view-cart__list-item-info-statistic'>
                  <span className='view-cart__list-item-info-statistic-item'>3 total hours</span>
                  <span className='view-cart__list-item-info-statistic-item'>23 lectures</span>
                  <span className='view-cart__list-item-info-statistic-item'>All levels</span>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className='view-cart__list-item-info-line view-cart__list-item-info__btns'>
                <Space direction='vertical'>
                  <Button onClick={() => props.onRemove(_id)}>Remove</Button>
                  <Button>Save for later</Button>
                </Space>
              </div>
            </Col>
            <Col md={4}>
              <div className='view-cart__list-item-price'>
                <span className='view-cart__list-item-price-text'>${finalPrice}</span>
                <TagOutlined className='view-cart__list-item-price-icon' />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default CartItem;
