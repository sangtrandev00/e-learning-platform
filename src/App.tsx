import './assets/sass/reset.css';
import './assets/sass/_reset.scss';
import './assets/sass/_base.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import HomePage from './pages/site/Home';
import Dashboard from './pages/admin/Dashboard';
import ErrorPage from './pages/Error/404Error';
import CoursesList from './pages/admin/Courses/Courses';
import SiteCourses from './pages/site/Courses';
import CourseDetail from './pages/site/CourseDetail';
import AdminCourseDetail from './pages/admin/Courses/components/CourseDetail';
import ViewCart from './pages/site/ViewCart';
import Checkout from './pages/site/Checkout';
import StartLearning from './pages/site/StartLearning';
import Profile from './pages/site/Profile';
import PathPlayer from './pages/site/PathPlayer';
import Users from './pages/admin/Users';
import Categories from './pages/admin/Categories';
import Settings from './pages/admin/Settings';
import Orders from './pages/admin/Orders';
import OrderCompleted from './pages/site/OrderCompleted';
import ReportsCenter from './pages/admin/Reports';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/courses',
        children: [
          {
            index: true,
            element: <SiteCourses />
          },
          {
            path: ':courseId',
            element: <CourseDetail />
          }
        ]
      },
      {
        path: 'start',
        element: <StartLearning />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'view-cart',
        element: <ViewCart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'order-completed',
        element: <OrderCompleted />
      },
      {
        path: 'contact',
        element: <div>Contact Page</div>
      },
      {
        path: 'about-us',
        element: <div>About Us Page</div>
      }
    ],
    errorElement: <ErrorPage page='/author' />
  },
  {
    path: '/author',
    element: <RootAdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'courses',

        children: [
          {
            index: true,
            element: <CoursesList />
          },
          {
            id: 'course-detail',
            path: ':courseId',
            element: <AdminCourseDetail />
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <Users />
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <Orders />
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            index: true,
            element: <Categories />
          }
        ]
      },
      {
        path: 'reports',
        children: [
          {
            index: true,
            element: <ReportsCenter />
          }
        ]
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ],
    errorElement: <div>Admin Error</div>
  },
  {
    path: 'path-player',
    element: <PathPlayer />
  }
]);

function App() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  }

  return <RouterProvider router={router} />;
}

export default App;
