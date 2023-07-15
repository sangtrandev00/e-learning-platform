import React from 'react';
import './ViewCart.scss';
import { Button, Col, Divider, Input, Row, Space } from 'antd';
import { StarFilled, TagOutlined } from '@ant-design/icons';
import ButtonCmp from '../../../components/Button';
import CartItem from './components/CartItem';
import { Link } from 'react-router-dom';
const ViewCart = () => {
  return (
    <div className='view-cart'>
      <div className='view-cart__wrap container spacing-h-sm'>
        <h2 className='view-cart__title'>Shopping Cart</h2>
        <div className='view-cart__content '>
          <Row>
            <Col md={18}>
              <div className='view-cart__list'>
                <h4 className='view-cart__list-title'>2 Courses in Cart</h4>
                <div className='view-cart__list-wrap'>
                  <CartItem />
                  <CartItem />
                  <CartItem />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='view-cart__summary'>
                <h4 className='view-cart__summary-title'>Total: </h4>
                <h3 className='view-cart__summary-price'>₫1,328,000</h3>
                <Link to='/checkout'>
                  <div className='view-cart__summary-btn btn btn-md'>Checkout</div>
                </Link>
                <Divider />
                <div className='view-cart__summary-promo'>
                  <span className='view-cart__summary-promo-title'>Promo code</span>
                  <div className='view-cart__summary-promo-input-group'>
                    <Space.Compact style={{ width: '100%' }}>
                      <Input defaultValue='Enter Coupon' />
                      <ButtonCmp className='btn btn-sm'>Apply</ButtonCmp>
                    </Space.Compact>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
