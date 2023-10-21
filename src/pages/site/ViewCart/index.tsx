import { Col, Divider, Input, Row, Skeleton, Space, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import { RootState } from '../../../store/store';
import { openAuthModal } from '../../auth.slice';
import { useGetRetrieveCartQuery } from '../client.service';
import { removeCart } from '../client.slice';
import './ViewCart.scss';
import CartItem from './components/CartItem';
const ViewCart = () => {
  const cart = useSelector((state: RootState) => state.client.cart);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const courseIds = cart.items.map((item) => item.courseId);

  const { data: cartData, isFetching: isCartFetching } = useGetRetrieveCartQuery({ courseIds });

  const totalPrice = cartData?.cart.totalPrice || 0;
  const cartItems = cartData?.cart.items || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartHandler = (courseId: string) => {
    dispatch(removeCart(courseId));

    notification.success({
      message: 'Course removed from cart'
    });
  };

  const checkoutHandler = () => {
    if (courseIds.length === 0) {
      notification.error({
        message: 'Please add courses to cart'
      });
      return;
    }

    if (isAuth) {
      console.log('checkout handler');
      navigate('/checkout');
    } else {
      notification.error({
        message: 'Please login to checkout'
      });

      dispatch(openAuthModal());
    }
  };

  return (
    <div className='view-cart'>
      <div className='view-cart__wrap container spacing-h-sm'>
        <h2 className='view-cart__title'>Shopping Cart</h2>
        <div className='view-cart__content '>
          <Row>
            <Col md={18} sm={24}>
              <div className='view-cart__list'>
                <h4 className='view-cart__list-title'>{cart?.items?.length || 0} Courses in Cart</h4>
                <div className='view-cart__list-wrap'>
                  {isCartFetching && <Skeleton />}
                  {!isCartFetching &&
                    cartItems.map((cartItem) => {
                      return (
                        <CartItem
                          // onTotal={calcTotalCartPrice}
                          key={cartItem._id}
                          courseItem={cartItem}
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
                <div onClick={checkoutHandler}>
                  <div className='view-cart__summary-btn btn btn-md'>Checkout</div>
                </div>
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
