import './assets/sass/reset.css';
import './assets/sass/_reset.scss';
import './assets/sass/_base.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import HomePage from './pages/site/Home';
import Dashboard from './pages/admin/Dashboard';
import ErrorPage from './pages/Error/404Error';
import CoursesList from './pages/admin/Courses/Courses.';
import SiteCourses from './pages/site/Courses';
import CourseDetail from './pages/site/CourseDetail';
import ViewCart from './pages/site/ViewCart';
import Checkout from './pages/site/Checkout';

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
            path: ':id',
            element: <CourseDetail />
          }
        ]
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
        path: 'courses-manager',

        children: [
          {
            index: true,
            element: <CoursesList />
          },
          {
            id: 'course-detail',
            path: ':courseid',
            element: <div>Course detail</div>
          }
        ]
      },
      {
        path: 'users',
        element: <div>User Management</div>
      },
      {
        path: 'setting',
        element: <div>Setting </div>
      }
    ],
    errorElement: <div>Admin Error</div>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
