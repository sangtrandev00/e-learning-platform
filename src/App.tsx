import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/sass/_base.scss';
import './assets/sass/_reset.scss';
import './assets/sass/reset.css';
import InstructorsRevenues from './components/AdminLayout/Header/components/InstructorsRevenues';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import RootLayout from './components/layout/RootLayout';
import AdminAuth from './pages/admin/Auth';
import Categories from './pages/admin/Categories';
import AdminCourseDetail from './pages/admin/Courses/components/CourseDetail';
import CoursesList from './pages/admin/Courses/Courses';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import ReportsCenter from './pages/admin/Reports';
import CancelledSales from './pages/admin/Reports/components/CancelledSales';
import Certifications from './pages/admin/Reports/components/Certifications';
import CourseInsights from './pages/admin/Reports/components/CourseInsights';
import {
  default as CoursesRevenue,
  default as CoursesRevenues
} from './pages/admin/Reports/components/CoursesReveneue';
import InstructorsRevene from './pages/admin/Reports/components/InstructorsRevenue';
import ReviewsCenter from './pages/admin/Reports/components/ReviewsCenter';
import UsersProgress from './pages/admin/Reports/components/UsersProgress';
import UsersSegment from './pages/admin/Reports/components/UsersSegments';
import Settings from './pages/admin/Settings';
import Users from './pages/admin/Users';
import {
  setAdminAuthenticated,
  setAdminUnauthenticated,
  setAuthenticated,
  setUnauthenticated
} from './pages/auth.slice';
import ErrorPage from './pages/Error/404Error';
import AuthorProfile from './pages/site/AuthorProfile';
import Checkout from './pages/site/Checkout';
import CourseDetail from './pages/site/CourseDetail';
import SiteCourses from './pages/site/Courses';
import HomePage from './pages/site/Home';
import OrderCompleted from './pages/site/OrderCompleted';
import PathPlayer from './pages/site/PathPlayer';
import Profile from './pages/site/Profile';
import StartLearning from './pages/site/StartLearning';
import SubsribeCourse from './pages/site/SubscribeCourse';
import ViewCart from './pages/site/ViewCart';

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
      },
      {
        path: 'user',
        children: [
          {
            path: ':userId',
            element: <AuthorProfile />
          }
        ]
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
            element: <CourseInsights />
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
          },
          {
            path: 'courses-revenues',
            element: <CoursesRevenues />
          },
          {
            path: 'instructors-revenues',
            element: <InstructorsRevenues />
          },
          {
            path: 'certifications',
            element: <Certifications />
          },
          {
            path: 'reviews-center',
            element: <ReviewsCenter />
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
  },
  {
    path: 'cart/subscribe/course/',
    children: [
      {
        path: ':courseId',
        element: <SubsribeCourse />
      }
    ]
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
