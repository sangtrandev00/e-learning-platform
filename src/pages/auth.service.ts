import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/user.type';
import { CustomError } from '../utils/helpers';

/**
 * Mô hình sync dữ liệu danh sách bài post dưới local sau khi thêm 1 bài post
 * Thường sẽ có 2 cách tiếp cận
 * Cách 1: Đây là cách những video trước đây mình dùng
 * 1. Sau khi thêm 1 bài post thì server sẽ trả về data của bài post đó
 * 2. Chúng ta sẽ tiến hành lấy data đó thêm vào state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * ====> Rủi ro cách này là nếu khi gọi request add post mà server trả về data không đủ các field để
 * chúng ta hiển thị thì sẽ gặp lỗi. Nếu có nhiều người cùng add post thì data sẽ sync thiếu,
 * Chưa kể chúng ta phải quản lý việc cập nhật state nữa, hơi mệt!
 *
 *
 * Cách 2: Đây là cách thường dùng với RTK query
 * 1. Sau khi thêm 1 bài post thì server sẽ trả về data của bài post đó
 * 2. Chúng ta sẽ tiến hành fetch lại API get Orders để cập nhật state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * =====> Cách này giúp data dưới local sẽ luôn mới nhất, luôn đồng bộ với server
 * =====> Khuyết điểm là chúng ta sẽ tốn thêm một lần gọi API. Thực ra thì điều này có thể chấp nhận được
 */

interface loginResponse {
  token: string;
  userId: string;
  message: string;
}
interface signupResponse {
  userId: string;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi', // Tên field trong Redux state
  tagTypes: ['Orders'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/auth',
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ABCXYZ');
      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    /**
     * Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
     * Post là response trả về và Omit<Post, 'id'> là body gửi lên
     */
    login: build.mutation<loginResponse, { email: string; password: string }>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: 'login',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Orders sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Orders', id: 'LIST' }])
    }),
    adminLogin: build.mutation<loginResponse, { email: string; password: string }>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: 'admin-login',
            method: 'POST',
            body
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Orders sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Orders', id: 'LIST' }])
    }),
    signup: build.mutation<signupResponse, Omit<IUser, '_id'>>({
      query(body) {
        return {
          url: `signup`,
          method: 'PUT',
          body
        };
      },
      // Trong trường hợp này thì Orders sẽ chạy lại
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Orders', id: data.id }])
    }),
    resetPassword: build.mutation<IUser, { id: string; body: IUser }>({
      query(data) {
        return {
          url: `signup`,
          method: 'PUT',
          body: data.body
        };
      },
      // Trong trường hợp này thì Orders sẽ chạy lại
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Orders', id: data.id }])
    })
  })
});

export const { useLoginMutation, useSignupMutation, useResetPasswordMutation } = authApi;
