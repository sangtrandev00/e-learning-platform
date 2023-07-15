import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rtkQueryErrorLogger } from '../middleware/middleware';
import { courseApi } from '../pages/admin/Courses/course.service';
import courseReducer from '../pages/admin/Courses/course.slice';

export const store = configureStore({
  reducer: {
    course: courseReducer,
    [courseApi.reducerPath]: courseApi.reducer // thêm reducer được tạo từ api slice
  },
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courseApi.middleware, rtkQueryErrorLogger)
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Write Hello world function in javascript
