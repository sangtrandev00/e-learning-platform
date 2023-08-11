import { BellOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Dropdown, Input, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { closeAuthModal, openAuthModal, setUnauthenticated } from '../../../pages/auth.slice';
import Login from '../../../pages/site/Auth/Login';
import Signup from '../../../pages/site/Auth/Signup';
import { useGetUserQuery } from '../../../pages/site/client.service';
import { setSearchQuery } from '../../../pages/site/client.slice';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import Button from '../../Button';
import './Header.scss';
import CategoriesNav from './components/CategoriesNav';

const { Search } = Input;

const Header = () => {
  // State here

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenAuthModal = useSelector((state: RootState) => state.auth.isOpenAuthModal);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [authState, setAuthState] = useState('login');
  const cart = useSelector((state: RootState) => state.client.cart);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [userData, setUserData] = useState<IUser>();
  const { data, isFetching } = useGetUserQuery(userId, {
    skip: !userId
  });
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPath = location.pathname;

  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  const userAuthItems: MenuProps['items'] = [
    {
      label: (
        <Link to='/profile'>
          <div>{userData?.name}</div>
          <div>{userData?.email}</div>
        </Link>
      ),
      key: 'profile',
      icon: <Avatar src={userData?.avatar} />
    },
    {
      label: <Link to='/start'>My Learning</Link>,
      key: 'mylearning',
      icon: <UserOutlined />
    },
    {
      label: 'Instructor Dashboard',
      key: 'instructor',
      icon: <UserOutlined />
    },
    {
      label: 'Notifications',
      key: 'notifications',
      icon: <UserOutlined />
    },
    {
      label: 'Messages',
      key: 'messages',
      icon: <UserOutlined />
    },
    {
      label: 'Account Settings',
      key: 'account-settings',
      icon: <UserOutlined />
    },
    {
      label: 'Payment method',
      key: 'payment-method',
      icon: <UserOutlined />
    },
    {
      label: 'Purchase history',
      key: 'purchase-history',
      icon: <UserOutlined />
    },
    {
      label: 'Public Profile',
      key: 'public-profile',
      icon: <UserOutlined />
    },
    {
      label: 'Edit Profile',
      key: 'edit-profile',
      icon: <UserOutlined />
    },
    {
      label: 'Help',
      key: 'help',
      icon: <UserOutlined />
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

  const notificationItems: MenuProps['items'] = [
    {
      label: 'Note 1',
      key: '1',
      icon: <UserOutlined />
    },
    {
      label: 'Note 2',
      key: '2',
      icon: <UserOutlined />
    },
    {
      label: 'Note 3',
      key: '3',
      icon: <UserOutlined />,
      danger: true
    },
    {
      label: 'Note 4',
      key: 'Note 5',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

  const wishlistItems: MenuProps['items'] = [
    {
      label: 'wishlist 1',
      key: '1',
      icon: <UserOutlined />
    },
    {
      label: 'Wishlist 2',
      key: '2',
      icon: <UserOutlined />
    },
    {
      label: 'Wishlist 3',
      key: '3',
      icon: <UserOutlined />,
      danger: true
    },
    {
      label: 'Wishlist 4',
      key: 'Note 5',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

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

  const menuUserProps = {
    items: userAuthItems,
    onClick: handleMenuClick
  };
  const menuNotificationsProps = {
    items: notificationItems,
    onClick: handleMenuClick
  };
  const menuWishlistProps = {
    items: wishlistItems,
    onClick: handleMenuClick
  };

  const onSearch = (value: string) => {
    console.log(value);
    dispatch(setSearchQuery(value));
    setSearchParams({ _q: value });
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
        <div className='header__search'>
          <Search
            style={{ width: '30rem' }}
            placeholder='Search to find your suitable courses'
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div className='header__nav'>
          <ul className='header__nav-list'>
            {isAuth && (
              <li className='header__nav-item'>
                <Link to='/start' className='header__nav-link'>
                  My Learning
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
                <Badge count={cart?.items?.length || 0}>
                  <ShoppingCartOutlined className='header__nav-link-icon' />
                </Badge>
              </Link>
            </li>
            {isAuth && (
              <li className='header__nav-item'>
                <Dropdown menu={menuWishlistProps} placement='bottomRight'>
                  <Badge dot={true}>
                    {/* <Avatar shape="square" size="large" /> */}
                    <HeartOutlined
                      className='header__nav-item-user-icon header__nav-link-icon'
                      style={{ cursor: 'pointer' }}
                    />
                    {/* <UserOutlined className='header__nav-item-user-icon' style={{ cursor: 'pointer' }} /> */}
                  </Badge>
                </Dropdown>
              </li>
            )}

            {isAuth && (
              <li className='header__nav-item'>
                <Dropdown menu={menuNotificationsProps} placement='bottomRight'>
                  <Badge dot={true}>
                    {/* <Avatar shape="square" size="large" /> */}
                    <BellOutlined
                      className='header__nav-item-notify-icon header__nav-link-icon'
                      style={{ cursor: 'pointer' }}
                    />
                    {/* <UserOutlined className='header__nav-item-user-icon' style={{ cursor: 'pointer' }} /> */}
                  </Badge>
                </Dropdown>
              </li>
            )}

            {isAuth && (
              <li className='header__nav-item'>
                <Dropdown menu={menuUserProps} placement='bottomRight'>
                  <Badge dot={true}>
                    <Avatar className='header__nav-item-user-icon' src={userData?.avatar} />
                    {/* <UserOutlined className='header__nav-item-user-icon' style={{ cursor: 'pointer' }} /> */}
                  </Badge>
                </Dropdown>
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
      {currentPath === '/' && <CategoriesNav />}
      <Modal title='' open={isOpenAuthModal} onOk={handleOk} onCancel={handleCancel}>
        {authState === 'login' && <Login onClick={changeAuthState} />}
        {authState === 'signup' && <Signup onClick={changeAuthState} />}
      </Modal>
    </div>
  );
};

export default Header;
