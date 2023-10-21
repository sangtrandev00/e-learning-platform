import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/sass/_base.scss';
import './assets/sass/reset.css';
import './assets/sass/tailwind.css';
import InstructorsRevenues from './components/AdminLayout/Header/components/InstructorsRevenues';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import BigSpinner from './components/BigSpinner';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './pages/Error/404Error';
import AdminAuth from './pages/admin/Auth';
import Categories from './pages/admin/Categories';
import CoursesList from './pages/admin/Courses/Courses';
import AdminCourseDetail from './pages/admin/Courses/components/CourseDetail';
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
import About from './pages/site/About';
import AuthorProfile from './pages/site/AuthorProfile';
import Checkout from './pages/site/Checkout';
import Contact from './pages/site/Contact';
import CourseDetail from './pages/site/CourseDetail';
import SiteCourses from './pages/site/Courses';
import HomePage from './pages/site/Home';
import OrderCompleted from './pages/site/OrderCompleted';
import PathPlayer from './pages/site/PathPlayer';
import Profile from './pages/site/Profile';
import StartLearning from './pages/site/StartLearning';
import SubsribeCourse from './pages/site/SubscribeCourse';
import ViewCart from './pages/site/ViewCart';
import { RootState } from './store/store';
import { UserRole } from './types/user.type';

function App() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the token is stored in local storage
    const token = localStorage.getItem('token');
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

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isAdminAuth = useSelector((state: RootState) => state.auth.isAdminAuth);
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

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
          element: isAuth ? <StartLearning /> : <ErrorPage page='/' />
        },
        {
          path: 'profile',
          element: isAuth ? <Profile /> : <ErrorPage page='/' />
        },
        {
          path: 'view-cart',
          element: <ViewCart />
        },
        {
          path: 'checkout',
          element: isAuth ? <Checkout /> : <ErrorPage page='/' />
        },
        {
          path: 'order-completed',
          element: isAuth ? <OrderCompleted /> : <ErrorPage page='/' />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'about-us',
          element: <About />
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
      element: isAdminAuth ? <RootAdminLayout /> : <ErrorPage page='/author-login' />,
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
              element: adminRole === UserRole.ADMIN ? <Users /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: adminRole === UserRole.ADMIN ? <Orders /> : <Navigate to='/error' />
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
          children:
            adminRole === UserRole.ADMIN
              ? [
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
              : []
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
      element: isAuth ? <PathPlayer /> : <ErrorPage page='/' />
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
          element: isAuth ? <SubsribeCourse /> : <ErrorPage page='/' />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} fallbackElement={<BigSpinner />} />;
}

export default App;
