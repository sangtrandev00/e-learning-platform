import { Button, Col, Divider, Row, Space } from 'antd';
import React from 'react';
import { StarFilled, TagOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// type Props = {};

const CartItem = () => {
  return (
    <div className='view-cart__list-item'>
      <Divider className='view-cart__list-item-divider' />
      <Row>
        <Col md={4}>
          <Link to='/courses/32' className='view-cart__list-item-thumb'>
            <img
              src='https://img-c.udemycdn.com/course/240x135/17029_1280_7.jpg'
              alt=''
              className='view-cart__list-item-img'
            />
          </Link>
        </Col>
        <Col md={12}>
          <div className='view-cart__list-item-info'>
            <Link to='/courses/32' className='view-cart__list-item-info-line view-cart__list-item-info-name'>
              Sales and Persuasion Skills for Startups
            </Link>
            <p className='view-cart__list-item-info-line view-cart__list-item-info-author'>By Sang and 1 other</p>
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
              <Button>Remove</Button>
              <Button>Save for later</Button>
            </Space>
          </div>
        </Col>
        <Col md={4}>
          <div className='view-cart__list-item-price'>
            <span className='view-cart__list-item-price-text'>đ899,000</span>
            <TagOutlined className='view-cart__list-item-price-icon' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
