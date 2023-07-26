import Button from '../../Button';
import './Header.scss';

import { Link } from 'react-router-dom';
import { Badge, Modal, Space } from 'antd';
import { useState } from 'react';
import Login from '../../../pages/site/Auth/Login';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Signup from '../../../pages/site/Auth/Signup';
const Header = () => {
  // State here

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authState, setAuthState] = useState('login');
  const cart = useSelector((state: RootState) => state.client.cart);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const signInHandler = () => {
    setAuthState('login');
    setIsModalOpen(true);
  };

  const signUpHandler = () => {
    setAuthState('signup');
    setIsModalOpen(true);
  };

  const changeAuthState = (authState: string) => {
    console.log(authState);

    setAuthState(authState);
  };

  return (
    <div className='header'>
      <div className='header__wrapper'>
        <Link to='/' className='header__logo'>
          <img
            src='https://cdn.mycourse.app/images/site-templates/79ae2363c5798f1d6e79d14f2c7c3730.png'
            alt=''
            className='header__logo-img'
          />
        </Link>
        <div className='header__nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-item'>
              <Link to='/start' className='header__nav-link'>
                Start
              </Link>
            </li>
            <li className='header__nav-item'>
              <Link to='/' className='header__nav-link'>
                Home
              </Link>
            </li>
            <li className='header__nav-item'>
              <Link to='/courses' className='header__nav-link'>
                Courses
              </Link>
            </li>
            <li className='header__nav-item'>
              <Link to='/contact' className='header__nav-link'>
                Contact
              </Link>
            </li>
            <li className='header__nav-item'>
              <Link to='/about-us' className='header__nav-link'>
                About us
              </Link>
            </li>
            <div className='header__nav-item'>
              <Link className='header__nav-link' to='/view-cart'>
                <Badge count={cart.items.length}>
                  <ShoppingCartOutlined className='header__nav-link-icon' />
                </Badge>
              </Link>
            </div>
          </ul>
          <div className='header__auth'>
            <Space>
              <Button onClick={signInHandler} className='btn btn-sm'>
                Sign in
              </Button>
              <Button onClick={signUpHandler} className='btn btn-sm btn-outline-primary'>
                Sign up
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <Modal title='' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {authState === 'login' && <Login />}
        {authState === 'signup' && <Signup onClick={changeAuthState} />}
      </Modal>
    </div>
  );
};

export default Header;
