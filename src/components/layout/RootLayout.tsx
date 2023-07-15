import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './SiteLayout.scss';
const RootSiteLayout = () => {
  return (
    <div className='main' id='main'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootSiteLayout;
