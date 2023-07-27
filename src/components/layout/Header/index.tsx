import Button from '../../Button';
import './Header.scss';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Modal, Space } from 'antd';
import { useState } from 'react';
import Login from '../../../pages/site/Auth/Login';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Signup from '../../../pages/site/Auth/Signup';
import { closeAuthModal, openAuthModal, setAuthenticated, setUnauthenticated } from '../../../pages/auth.slice';

const Header = () => {
  const userAuthItems: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];
  // State here

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenAuthModal = useSelector((state: RootState) => state.auth.isOpenAuthModal);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [authState, setAuthState] = useState('login');
  const cart = useSelector((state: RootState) => state.client.cart);

  const dispatch = useDispatch();

  const handleOk = () => {
    // setIsModalOpen(false);
    dispatch(closeAuthModal());
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
    dispatch(closeAuthModal());
  };

  const signInHandler = () => {
    setAuthState('login');
    dispatch(openAuthModal());
  };

  const signUpHandler = () => {
    setAuthState('signup');
    dispatch(openAuthModal());
  };

  const changeAuthState = (authState: string) => {
    console.log(authState);

    setAuthState(authState);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e);

    if (e.key === 'logout') {
      dispatch(setUnauthenticated());
    }
  };

  const menuProps = {
    items: userAuthItems,
    onClick: handleMenuClick
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
            {isAuth && (
              <li className='header__nav-item'>
                <Link to='/start' className='header__nav-link'>
                  Start
                </Link>
              </li>
            )}
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

            <li className='header__nav-item'>
              <Link className='header__nav-link' to='/view-cart'>
                <Badge count={cart.items.length}>
                  <ShoppingCartOutlined className='header__nav-link-icon' />
                </Badge>
              </Link>
            </li>
            {isAuth && (
              <li className='header__nav-item'>
                <Dropdown.Button
                  onClick={handleButtonClick}
                  menu={menuProps}
                  placement='bottom'
                  icon={<UserOutlined />}
                >
                  Dropdown
                </Dropdown.Button>
              </li>
            )}
          </ul>
          <div className='header__auth'>
            {!isAuth && (
              <Space>
                <Button onClick={signInHandler} className='btn btn-sm'>
                  Sign in
                </Button>
                <Button onClick={signUpHandler} className='btn btn-sm btn-outline-primary'>
                  Sign up
                </Button>
              </Space>
            )}
          </div>
        </div>
      </div>

      <Modal title='' open={isOpenAuthModal} onOk={handleOk} onCancel={handleCancel}>
        {authState === 'login' && <Login onClick={changeAuthState} />}
        {authState === 'signup' && <Signup onClick={changeAuthState} />}
      </Modal>
    </div>
  );
};

export default Header;
