import { Layout, theme } from 'antd';
import { useMatch } from 'react-router-dom';
import './Header.scss';
import DashboardHeader from './components/DashboardHeader';
import UsersHeader from './components/UsersHeader';
const { Header } = Layout;
const AdminHeader = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const match = useMatch('/author/:path');
  const path = match ? match.params.path : '';
  console.log(path);

  return (
    <Header className='admin-header' style={{ padding: 0, background: colorBgContainer }}>
      {path === 'dashboard' && <DashboardHeader />}
      {path === 'courses' && <DashboardHeader />}
      {path === 'users' && <UsersHeader />}
      {path === 'categories' && <DashboardHeader />}
    </Header>
  );
};

export default AdminHeader;
