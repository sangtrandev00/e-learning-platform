import { Outlet } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import './RootLayout.scss';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleOutlined,
  LeftOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Drawer, Layout, Menu, Space, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

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
  getItem('sangtrandev', 'myprofile', <PieChartOutlined />),
  getItem('Dashboard', 'dashboard', <PieChartOutlined />),
  getItem('Courses', 'courses', <DesktopOutlined />, [
    getItem('Course Manager', 'courses-manager'),
    getItem('Course 2', 'fsdjfklsdf')
  ]),
  getItem('Users', 'users', <UserOutlined />, [
    getItem('All Users', 'users-manager'),
    getItem('Admins', 'admins'),
    getItem('Intructors', 'intructors')
  ]),
  getItem('Setting', 'setting', <TeamOutlined />, [getItem('Team 1', '6fsdfsd'), getItem('Team 2', '8fsdf')]),
  getItem('My account', 'accouont', <FileOutlined />),
  getItem('Need Help ?', 'help', <FileOutlined />)
];

const RootAdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const navigate = useNavigate();

  const navigateHandler: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    navigate(e.key);
    setOpenDrawer(true);
  };

  return (
    <Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className='demo-logo-vertical' />
          <Menu onClick={navigateHandler} theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Space>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
              <Button>
                <PlusCircleOutlined />
                Create Course
              </Button>
              <Button>
                <PlusCircleOutlined />
                Preview Hompage
              </Button>
              <Button>
                <PlusCircleOutlined />
                Preview Hompage after login
              </Button>
            </Space>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>

      <Drawer
        className='drawer'
        title='Basic Drawer'
        placement='left'
        onClose={closeDrawer}
        open={openDrawer}
        mask={false}
        width={160}
      >
        <Space size='middle' align='start'>
          <Space.Compact size='middle' direction='vertical'>
            <Button>
              <LeftOutlined />
              Back
            </Button>

            <Button>
              <PlusCircleOutlined />
              Create Course
            </Button>
          </Space.Compact>
        </Space>
      </Drawer>
    </Fragment>
  );
};

export default RootAdminLayout;
