import React, { useEffect, useState } from 'react';
import './ViewCart.scss';
import { Button, Col, Divider, Input, Row, Space } from 'antd';
import ButtonCmp from '../../../components/Button';
import CartItem from './components/CartItem';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { removeCart } from '../client.slice';
const ViewCart = () => {
  const cart = useSelector((state: RootState) => state.client.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  let sumFinalPrice = 0;
  const calcTotalCartPrice = (finalPrice: number) => {
    sumFinalPrice += finalPrice;
    setTotalPrice(sumFinalPrice);
  };

  const removeCartHandler = (courseId: string) => {
    console.log('remove from cart: course id: ', courseId);
    dispatch(removeCart(courseId));
  };

  return (
    <div className='view-cart'>
      <div className='view-cart__wrap container spacing-h-sm'>
        <h2 className='view-cart__title'>Shopping Cart</h2>
        <div className='view-cart__content '>
          <Row>
            <Col md={18}>
              <div className='view-cart__list'>
                <h4 className='view-cart__list-title'>{cart.items.length || 0} Courses in Cart</h4>
                <div className='view-cart__list-wrap'>
                  {cart.items.map((cartItem) => {
                    return (
                      <CartItem
                        onTotal={calcTotalCartPrice}
                        key={cartItem.courseId}
                        courseId={cartItem.courseId}
                        onRemove={removeCartHandler}
                      />
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='view-cart__summary'>
                <h4 className='view-cart__summary-title'>Total: </h4>
                <h3 className='view-cart__summary-price'>${totalPrice}</h3>
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
