import React, { useState } from 'react';
import { Col, Collapse, CollapseProps, Divider, Row, Select, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import type { CSSProperties } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import DetailItem from './components/DetailItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useCreateOrderMutation } from '../client.service';
import './Checkout.scss';
import { clearCart } from '../client.slice';
const text = `
Name on card
TRAN NHAT SANG

Card number
**** 0124

Expiry date
5/2026
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: 'Visa  **** 0124',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '2',
    label: 'Credit/Debit Card',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '3',
    label: 'Paypal',
    children: <p>{text}</p>,
    style: panelStyle
  }
];

const Checkout = () => {
  const { token } = theme.useToken();
  const [createOrder, createOrderResult] = useCreateOrderMutation();

  const panelStyle = {
    marginBottom: 0,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: '1px solid rgba(0, 0, 0, 0.1)'
  };

  const cart = useSelector((state: RootState) => state.client.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sumFinalPrice = 0;

  const calcTotalCartPrice = (finalPrice: number) => {
    console.log('calcTotalCartPrice');
    sumFinalPrice += finalPrice;
    setTotalPrice(sumFinalPrice);
  };

  const checkoutHandler = () => {
    console.log('checkout handler');

    const newOrder = {
      items: cart.items,
      user: {
        _id: '64a26c3bc87fa04e3d1c8995',
        email: 'morgan@gmail.com',
        name: 'Sharon morgan',
        phone: '0909125313'
      },
      transaction: {
        method: 'VNPay'
      },
      totalPrice: totalPrice,
      note: 'No caption',
      vatFee: totalPrice * 0.1
    };

    createOrder(newOrder)
      .unwrap()
      .then((result) => {
        console.log('result', result);
        if (result.order._id) {
          dispatch(clearCart());
          navigate(`/order-completed?orderId=${result.order._id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(createOrderResult);
  };

  return (
    <div className='checkout'>
      <div className='checkout__wrap container '>
        <Row>
          <Col className='checkout__col checkout__col--left spacing-h-sm' md={12}>
            <h2 className='checkout__title'>Checkout</h2>
            <h3 className='checkout__billing-title'>Billing address</h3>
            <div className='checkout__countries'>
              <div className='checkout__countries-header'>
                <span className='checkout__countries-header-item checkout__countries-title'>Country</span>
                <span className='checkout__countries-header-item checkout__countries-required'>Required</span>
              </div>
              <div className='checkout__countries-body'>
                <Select
                  className='checkout__countries-select'
                  defaultValue='Viet Nam'
                  style={{ width: '50%' }}
                  options={[
                    { value: 'Singapore', label: 'Singapore' },
                    { value: 'Indo', label: 'Indo' },
                    { value: 'Malay', label: 'Malay' }
                  ]}
                />

                <div className='checkout__countries-condition-term'>
                  Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax
                  jurisdictions.
                </div>
              </div>

              <div className='checkout__payment-methods'>
                <div className='checkout__payment-header'>
                  <h3 className='checkout__payment-title'>Payment method</h3>
                  <span className='checkout__payment-secured'>Secured connection</span>
                </div>
                <div className='checkout__payment-body'>
                  <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ background: token.colorBgContainer }}
                    items={getItems(panelStyle)}
                  />
                </div>
              </div>
              <div className='checkout__orders-detail'>
                <h3 className='checkout__orders-detail-title'>Order details</h3>
                {cart.items.map((cartItem) => {
                  return (
                    <DetailItem onTotal={calcTotalCartPrice} key={cartItem.courseId} courseId={cartItem.courseId} />
                  );
                })}
                {/* <DetailItem />
                <DetailItem />
                <DetailItem />
                <DetailItem /> */}
              </div>
            </div>
          </Col>
          <Col className='checkout__col checkout__col--right spacing-h-sm' md={12}>
            <Row>
              <Col md={12}>
                <div className='checkout__summary'>
                  <h3 className='checkout__summary-title'>Summary</h3>
                  <div className='checkout__summary-row checkout__summary-price'>
                    <span className='checkout__summary-col checkout__summary-price-label'>Original Price:</span>
                    <span className='checkout__summary-col checkout__summary-price-text'>${totalPrice}</span>
                  </div>
                  <Divider className='checkout__summary-divider' />
                  <div className='checkout__summary-row checkout__summary-total'>
                    <span className='checkout__summary-col checkout__summary-total-label'>Total:</span>
                    <span className='checkout__summary-col checkout__summary-total-text'>${totalPrice}</span>
                  </div>

                  <div className='checkout__summary-notify'>
                    By completing your purchase you agree to these <Link to='/'> Terms of Service.</Link>
                  </div>
                  <ButtonCmp onClick={checkoutHandler} className='checkout__summary-btn btn btn-primary btn-md'>
                    Complete Checkout
                  </ButtonCmp>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
