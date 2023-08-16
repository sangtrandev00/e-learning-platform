import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICategory } from '../../../types/category.type';
import { IParams } from '../../../types/params.type';
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
 * 2. Chúng ta sẽ tiến hành fetch lại API get Categories để cập nhật state redux
 * 3. Lúc này UI chúng ta sẽ được sync
 *
 * =====> Cách này giúp data dưới local sẽ luôn mới nhất, luôn đồng bộ với server
 * =====> Khuyết điểm là chúng ta sẽ tốn thêm một lần gọi API. Thực ra thì điều này có thể chấp nhận được
 */

interface getCategoriesResponse {
  categories: ICategory[];
  message: string;
}

interface getCategoryResponse {
  category: ICategory;
  message: string;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi', // Tên field trong Redux state
  tagTypes: ['Categories'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }

      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    getAllCategories: build.query<getCategoriesResponse, void>({
      query: () => ({
        url: '/all-categories'
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho categories method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Categories chạy
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Categories' as const, _id })),
              { type: 'Categories' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Categories', id: 'LIST' }];
      }
    }),
    getCategories: build.query<getCategoriesResponse, IParams>({
      query: (params) => ({
        url: '/categories',
        params: params
      }), // method không có argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này
       * thì sẽ làm cho categories method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi Categories chạy
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Categories' as const, _id })),
              { type: 'Categories' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Categories', id: 'LIST' }];
      }
    }),
    /**
     * Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
     * Post là response trả về và Omit<Post, 'id'> là body gửi lên
     */
    addCategory: build.mutation<{ category: ICategory; message: string }, Omit<ICategory, '_id'>>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: 'category',
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
       * Trong trường hợp này Categories sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Categories', id: 'LIST' }])
    }),
    getCategory: build.query<getCategoryResponse, string>({
      query: (id) => ({
        url: `categories/${id}/single`
        // headers: {
        //   hello: 'Im duoc'
        // },
        // params: {
        //   first_name: 'du',
        //   'last-name': 'duoc'
        // }
      })
    }),
    updateCategory: build.mutation<ICategory, ICategory>({
      query(data) {
        return {
          url: `category/${data._id}`,
          method: 'PUT',
          body: data
        };
      },
      // Trong trường hợp này thì Categories sẽ chạy lại
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Categories', id: 'LIST' }])
    }),
    deleteCategory: build.mutation<Record<string, never>, string>({
      query(id) {
        return {
          url: `categories/${id}`,
          method: 'DELETE'
        };
      },
      // Trong trường hợp này thì Categorys sẽ chạy lại
      invalidatesTags: (result, error, id) => {
        console.log('result: ', result);
        console.log('error: ', error);
        console.log('id: ', id);

        return [{ type: 'Categories', id: 'LIST' }];
      }
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
