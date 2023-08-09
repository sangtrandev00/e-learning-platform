import { StarFilled, TagOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space } from 'antd';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../../constant/backend-domain';
import { formatVideoLengthToHours } from '../../../../utils/functions';
import { ICourseDetail } from '../../client.service';
import './CartItem.scss';

type CartItemProps = {
  courseItem: ICourseDetail;
  // onTotal: (finalPrice: number) => void;
  onRemove: (courseId: string) => void;
};

const CartItem = (props: CartItemProps) => {
  const { courseItem } = props;

  const {
    _id,
    name,
    finalPrice,
    thumbnail,
    userId: author,
    avgRatingStars,
    numOfReviews,
    lessons,
    totalVideosLength,
    level
  } = courseItem;

  let thumbnailUrl = '';

  if (thumbnail.startsWith('https')) {
    thumbnailUrl = thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
  }

  return (
    <Fragment>
      {/* {isFetching && <Skeleton />} */}
      {/* {!isFetching && ( */}
      <div className='view-cart__list-item'>
        <Divider className='view-cart__list-item-divider' />
        <Row>
          <Col md={4}>
            <Link to={`/courses/${_id}`} className='view-cart__list-item-thumb'>
              <img src={thumbnailUrl} alt='' className='view-cart__list-item-img' />
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
                  <div className='info-rating__point'>{avgRatingStars}</div>
                  <div className='info-rating__icons'>
                    <StarFilled className='info-rating__icons-item' />
                    <StarFilled className='info-rating__icons-item' />
                    <StarFilled className='info-rating__icons-item' />
                    <StarFilled className='info-rating__icons-item' />
                    <StarFilled className='info-rating__icons-item' />
                  </div>
                  <div className='info-rating__ratings'>({numOfReviews} ratings)</div>
                </div>
              </div>
              <div className='view-cart__list-item-info-line view-cart__list-item-info-statistic'>
                <span className='view-cart__list-item-info-statistic-item'>
                  {formatVideoLengthToHours(totalVideosLength)} total hours
                </span>
                <span className='view-cart__list-item-info-statistic-item'>{lessons} lectures</span>
                <span className='view-cart__list-item-info-statistic-item'>{level}</span>
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
      {/* )} */}
    </Fragment>
  );
};

export default CartItem;
