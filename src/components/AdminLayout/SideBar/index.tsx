import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BorderOuterOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  UserAddOutlined
} from '@ant-design/icons';

import './SideBar.scss';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('sangtrandev', 'myprofile', <BorderOuterOutlined />),
  getItem('Dashboard', 'dashboard', <PieChartOutlined />),
  getItem('Categories', 'categories', <UnorderedListOutlined />, [getItem('Categories', 'categories')]),
  getItem('Courses', 'courses', <DesktopOutlined />, [getItem('Course Manager', 'courses')]),
  getItem('Users', 'users', <UserOutlined />, [
    getItem('All Users', 'users'),
    getItem('Admins', 'admins'),
    getItem('Intructors', 'intructors')
  ]),
  getItem('Setting', 'setting', <SettingOutlined />, [getItem('Settings', 'settings')]),
  getItem('My account', 'account', <UserAddOutlined />),
  getItem('Need Help ?', 'help', <FileOutlined />)
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigateHandler: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    navigate(e.key);
    setOpenDrawer(true);
  };

  return (
    <Sider
      className='sidebar'
      style={{ backgroundColor: '#fff' }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className='demo-logo-vertical' />
      <Menu
        className='sidebar__menu'
        onClick={navigateHandler}
        theme='light'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
