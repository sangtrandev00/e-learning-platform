import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IOrder } from '../../../types/order.type';
import { CustomError } from '../../../utils/helpers';

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

interface getOrdersResponse {
  orders: IOrder[];
  count: number;
  total: number;
  message: string;
}

export const orderApi = createApi({
  reducerPath: 'orderApi', // Tên field trong Redux state
  tagTypes: ['Orders'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ABCXYZ');
      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    getOrders: build.query<getOrdersResponse, { courseId: string; date: string }>({
      query: (params) => ({
        url: '/orders',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho Orders method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Orders chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "User";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Orders' as const, _id })),
              { type: 'Orders' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Orders', id: 'LIST' }];
      }
    }),
    /**
     * Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
     * Post là response trả về và Omit<Post, 'id'> là body gửi lên
     */
    addOrder: build.mutation<IOrder, Omit<IOrder, 'id'>>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: 'order',
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
    getOrder: build.query<IOrder, string>({
      query: (id) => ({
        url: `orders/${id}`,
        headers: {
          hello: 'Im duoc'
        },
        params: {
          first_name: 'du',
          'last-name': 'duoc'
        }
      })
    }),
    updateOrder: build.mutation<IOrder, { id: string; body: IOrder }>({
      query(data) {
        return {
          url: `orders/${data.id}`,
          method: 'PUT',
          body: data.body
        };
      },
      // Trong trường hợp này thì Orders sẽ chạy lại
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Orders', id: data.id }])
    }),
    deleteOrder: build.mutation<Record<string, never>, string>({
      query(id) {
        return {
          url: `orders/${id}`,
          method: 'DELETE'
        };
      },
      // Trong trường hợp này thì Orders sẽ chạy lại
      invalidatesTags: (result, error, id) => [{ type: 'Orders', id }]
    })
  })
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = orderApi;
