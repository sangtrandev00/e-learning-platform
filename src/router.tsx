// import { Navigate, createBrowserRouter } from 'react-router-dom';
// import InstructorsRevenues from './components/AdminLayout/Header/components/InstructorsRevenues';
// import RootAdminLayout from './components/AdminLayout/RootLayout';
// import RootSiteLayout from './components/layout/RootLayout';
// import ErrorPage from './pages/Error/404Error';
// import AdminAuth from './pages/admin/Auth';
// import Categories from './pages/admin/Categories';
// import CoursesList from './pages/admin/Courses/components/CoursesList';
// import Dashboard from './pages/admin/Dashboard';
// import Orders from './pages/admin/Orders';
// import CancelledSales from './pages/admin/Reports/components/CancelledSales';
// import Certifications from './pages/admin/Reports/components/Certifications';
// import CourseInsights from './pages/admin/Reports/components/CourseInsights';
// import CoursesRevenues from './pages/admin/Reports/components/CoursesReveneue';
// import InstructorsRevene from './pages/admin/Reports/components/InstructorsRevenue';
// import ReviewsCenter from './pages/admin/Reports/components/ReviewsCenter';
// import UsersProgress from './pages/admin/Reports/components/UsersProgress';
// import UsersSegment from './pages/admin/Reports/components/UsersSegments';
// import Settings from './pages/admin/Settings';
// import Users from './pages/admin/Users';
// import About from './pages/site/About';
// import AuthorProfile from './pages/site/AuthorProfile';
// import Checkout from './pages/site/Checkout';
// import Contact from './pages/site/Contact';
// import CourseDetail from './pages/site/CourseDetail';
// import SiteCourses from './pages/site/Courses';
// import HomePage from './pages/site/Home';
// import OrderCompleted from './pages/site/OrderCompleted';
// import PathPlayer from './pages/site/PathPlayer';
// import Profile from './pages/site/Profile';
// import StartLearning from './pages/site/StartLearning';
// import SubsribeCourse from './pages/site/SubscribeCourse';
// import ViewCart from './pages/site/ViewCart';
// import { UserRole } from './types/user.type';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootSiteLayout />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />
//       },
//       {
//         path: '/courses',
//         children: [
//           {
//             index: true,
//             element: <SiteCourses />
//           },
//           {
//             path: ':courseId',
//             element: <CourseDetail />
//           }
//         ]
//       },
//       {
//         path: 'start',
//         element: isAuth ? <StartLearning /> : <ErrorPage page='/' />
//       },
//       {
//         path: 'profile',
//         element: isAuth ? <Profile /> : <ErrorPage page='/' />
//       },
//       {
//         path: 'view-cart',
//         element: <ViewCart />
//       },
//       {
//         path: 'checkout',
//         element: isAuth ? <Checkout /> : <ErrorPage page='/' />
//       },
//       {
//         path: 'order-completed',
//         element: isAuth ? <OrderCompleted /> : <ErrorPage page='/' />
//       },
//       {
//         path: 'contact',
//         element: <Contact />
//       },
//       {
//         path: 'about-us',
//         element: <About />
//       },
//       {
//         path: 'user',
//         children: [
//           {
//             path: ':userId',
//             element: <AuthorProfile />
//           }
//         ]
//       }
//     ],
//     errorElement: <ErrorPage page='/author' />
//   },
//   {
//     path: '/author',
//     element: isAdminAuth ? <RootAdminLayout /> : <ErrorPage page='/author-login' />,
//     children: [
//       {
//         path: 'dashboard',
//         element: <Dashboard />
//       },
//       {
//         path: 'courses',

//         children: [
//           {
//             index: true,
//             element: <CoursesList />
//           },
//           {
//             id: 'course-detail',
//             path: ':courseId',
//             element: <AdminCourseDetail />
//           }
//         ]
//       },
//       {
//         path: 'users',
//         children: [
//           {
//             index: true,
//             element: adminRole === UserRole.ADMIN ? <Users /> : <Navigate to='/error' />
//           }
//         ]
//       },
//       {
//         path: 'orders',
//         children: [
//           {
//             index: true,
//             element: adminRole === UserRole.ADMIN ? <Orders /> : <Navigate to='/error' />
//           }
//         ]
//       },
//       {
//         path: 'categories',
//         children: [
//           {
//             index: true,
//             element: <Categories />
//           }
//         ]
//       },
//       {
//         path: 'reports',
//         children:
//           adminRole === UserRole.ADMIN
//             ? [
//                 {
//                   index: true,
//                   element: <ReportsCenter />
//                 },
//                 {
//                   path: 'users-progress',
//                   element: <UsersProgress />
//                 },
//                 {
//                   path: 'users-segment',
//                   element: <UsersSegment />
//                 },
//                 {
//                   path: 'course-insights',
//                   element: <CourseInsights />
//                 },
//                 {
//                   path: 'courses-revenue',
//                   element: <CoursesRevenue />
//                 },
//                 {
//                   path: 'instructors-revenue',
//                   element: <InstructorsRevene />
//                 },
//                 {
//                   path: 'cancelled-sales',
//                   element: <CancelledSales />
//                 },
//                 {
//                   path: 'courses-revenues',
//                   element: <CoursesRevenues />
//                 },
//                 {
//                   path: 'instructors-revenues',
//                   element: <InstructorsRevenues />
//                 },
//                 {
//                   path: 'certifications',
//                   element: <Certifications />
//                 },
//                 {
//                   path: 'reviews-center',
//                   element: <ReviewsCenter />
//                 }
//               ]
//             : []
//       },
//       {
//         path: 'settings',
//         element: <Settings />
//       }
//     ],
//     errorElement: <div>Admin Error</div>
//   },
//   {
//     path: 'path-player',
//     element: isAuth ? <PathPlayer /> : <ErrorPage page='/' />
//   },
//   {
//     path: 'author-login',
//     element: <AdminAuth />
//   },
//   {
//     path: 'cart/subscribe/course/',
//     children: [
//       {
//         path: ':courseId',
//         element: isAuth ? <SubsribeCourse /> : <ErrorPage page='/' />
//       }
//     ]
//   }
// ]);

// export default router;
