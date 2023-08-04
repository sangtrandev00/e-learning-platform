import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rtkQueryErrorLogger } from '../middleware/middleware';
import { courseApi } from '../pages/admin/Courses/course.service';
import { categoryApi } from '../pages/admin/Categories/category.service';
import { orderApi } from '../pages/admin/Orders/order.service';
import courseReducer from '../pages/admin/Courses/course.slice';
import orderReducer from '../pages/admin/Orders/order.slice';
import categoryReducer from '../pages/admin/Categories/category.slice';
import { clientApi } from '../pages/site/client.service';
import clientReducer from '../pages/site/client.slice';
import { userApi } from '../pages/admin/Users/user.service';
import userReducer from '../pages/admin/Users/user.slice';
import { authApi } from '../pages/auth.service';
import authReducer from '../pages/auth.slice';
import { reportApi } from '../pages/admin/report.service';
import reportReducer from '../pages/admin/report.slice';

const rootReducer = combineReducers({
  course: courseReducer,
  [courseApi.reducerPath]: courseApi.reducer,
  order: orderReducer,
  [orderApi.reducerPath]: orderApi.reducer,
  category: categoryReducer,
  [userApi.reducerPath]: userApi.reducer,
  user: userReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  client: clientReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  report: reportReducer,
  [reportApi.reducerPath]: reportApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      courseApi.middleware,
      orderApi.middleware,
      categoryApi.middleware,
      userApi.middleware,
      clientApi.middleware,
      authApi.middleware,
      reportApi.middleware,
      rtkQueryErrorLogger
    )
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Write Hello world function in javascript
