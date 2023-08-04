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
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setAdminAuthenticated,
  setAdminUnauthenticated,
  setAuthenticated,
  setUnauthenticated
} from './pages/auth.slice';
import jwtDecode from 'jwt-decode';
import AdminLogin from './pages/admin/Auth/Login';
import AdminAuth from './pages/admin/Auth';
import UsersProgress from './pages/admin/Reports/components/UsersProgress';
import UsersSegment from './pages/admin/Reports/components/UsersSegments';
import CoursesRevenue from './pages/admin/Reports/components/CoursesReveneue';
import InstructorsRevene from './pages/admin/Reports/components/InstructorsRevenue';
import CancelledSales from './pages/admin/Reports/components/CancelledSales';

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
          },
          {
            path: 'users-progress',
            element: <UsersProgress />
          },
          {
            path: 'users-segment',
            element: <UsersSegment />
          },
          {
            path: 'course-insights',
            element: <UsersSegment />
          },
          {
            path: 'courses-revenue',
            element: <CoursesRevenue />
          },
          {
            path: 'instructors-revenue',
            element: <InstructorsRevene />
          },
          {
            path: 'cancelled-sales',
            element: <CancelledSales />
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
  },
  {
    path: 'author-login',
    element: <AdminAuth />
  }
]);

function App() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the token is stored in local storage
    const token = localStorage.getItem('token');
    console.log('App render effect check auth');
    if (token) {
      // Decode the token to check for expiration and other details (optional)
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

      // Check if the token has not expired (optional)
      if (Date.now() < expirationTime) {
        // Token is valid, dispatch action to set authentication state
        dispatch(setAuthenticated(token));
      } else {
        // Token has expired, handle accordingly (e.g., prompt user to log in again)
        console.log('Token has expired. Please log in again.');
        // Optionally, you can clear the token from local storage and dispatch a logout action:
        dispatch(setUnauthenticated());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Check if the adminToken is stored in local storage
    const adminToken = localStorage.getItem('adminToken');
    console.log('App render effect check auth admin');
    if (adminToken) {
      // Decode the token to check for expiration and other details (optional)
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(adminToken);
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

      // Check if the token has not expired (optional)
      if (Date.now() < expirationTime) {
        // Token is valid, dispatch action to set authentication state
        dispatch(setAdminAuthenticated(adminToken));
      } else {
        // Token has expired, handle accordingly (e.g., prompt user to log in again)
        console.log('Admin Token has expired. Please log in again.');
        // Optionally, you can clear the token from local storage and dispatch a logout action:
        dispatch(setAdminUnauthenticated());
      }
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
