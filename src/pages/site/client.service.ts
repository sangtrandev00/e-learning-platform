import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { BACKEND_URL } from '../../constant/backend-domain';
import { ICategory } from '../../types/category.type';
import { ICertificate } from '../../types/certificate';
import { ICourse } from '../../types/course.type';
import { ILesson, ISection } from '../../types/lesson.type';
import { IOrder } from '../../types/order.type';
import { IParams } from '../../types/params.type';
import { IUser } from '../../types/user.type';
import { CustomError } from '../../utils/helpers';

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

interface getCategoriesResponse {
  categories: ICategory[];
  message: string;
}

export interface getCoursesResponse {
  courses: ICourse[];
  message: string;
  pagination: {
    _limit: number;
    _totalRows: number;
    _page: number;
  };
}

export interface getPopularCoursesResponse {
  courses: ICourse[];
  pagination: {
    _limit: number;
    _totalRows: number;
    _page: number;
  };
  message: string;
}

export interface getRetrieveCartResponse {
  cart: {
    items: ICourseDetail[];
    totalPrice: number;
  };
  message: string;
}

export interface getAuthorsResponse {
  message: string;
  authors: [
    string,
    {
      name: string;
      _id: string;
    }
  ][];
}

export interface getSectionsResponse {
  sections: ISection[];
  message: string;
}

export interface getLessonsResponse {
  lessons: ILesson[];
  message: string;
}

export interface getCourseResponse {
  course: ICourse;
  message: string;
}

export interface ICourseEnrolledByUser extends ICourse {
  progress: number;
  totalVideosLengthDone: number;
  isBought: boolean;
  lessons: ILesson[];
  lessonsDone: string[];
  sections: ISection[];
}

export interface getCourseEnrolledByUserResponse {
  course: ICourseEnrolledByUser;
  message: string;
}

export interface ICourseDetail extends ICourse {
  lessons: number;
  sections: number;
  numOfReviews: number;
  totalVideosLength: number;
  avgRatingStars: number;
  students: number;
  isBought: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface getCourseDetailResponse {
  course: ICourseDetail;
  message: string;
}

export interface createOrderResponse {
  order: IOrder;
  message: string;
}

export interface getUserResponse {
  user: IUser;
  message: string;
}

export interface IUserDetail extends IUser {
  courses: ICourseEnrolledByUser[];
}

export interface getUserDetailResponse {
  user: IUserDetail;
  message: string;
}

export interface certificateRequest {
  courseId: string;
  userId: string;
  completionDate: string;
}

export interface createCertificateResponse {
  message: string;
  certificate: ICertificate;
}

export interface getCertificateResponse {
  certificate: ICertificate;
  message: string;
}

export const clientApi = createApi({
  reducerPath: 'clientApi', // Tên field trong Redux state
  tagTypes: ['Clients'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer ABCXYZ');

      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(token);

        headers.set('UserId', decodedToken.userId);
      }

      // Add the userId header

      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    getCategories: build.query<getCategoriesResponse, void>({
      query: () => '/categories', // method không có argument
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCourses: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses',
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getPopularCourses: build.query<getPopularCoursesResponse, IParams>({
      query: (params) => ({
        url: '/courses/popular',
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),

    getAuthors: build.query<getAuthorsResponse, void>({
      query: () => ({
        url: '/authors'
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCoursesOrderedByUser: build.query<getCoursesResponse, IParams>({
      query: (params) => ({
        url: `/courses/${params._userId as string}/ordered`,
        params: {
          _limit: params._limit,
          _page: params._page
        }
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getUserDetail: build.query<getUserDetailResponse, IParams>({
      query: (params) => ({
        url: `/users/${params._userId as string}/detail`,
        params: {
          _limit: params._limit,
          _page: params._page
        }
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    /**
     * Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
     * Post là response trả về và Omit<Post, 'id'> là body gửi lên
     */
    getRetrieveCart: build.query<getRetrieveCartResponse, { courseIds: string[] }>({
      query: (params) => ({
        url: `/cart/retrieve`,
        params: {
          _courseIds: params.courseIds
        }
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    createOrder: build.mutation<createOrderResponse, Omit<IOrder, '_id'>>({
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
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Clients', id: 'LIST' }])
    }),
    updateLessonDoneByUser: build.mutation<createOrderResponse, { userId: string; lessonId: string }>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: `lesson-done/${body.lessonId}`,
            method: 'POST',
            body: {
              userId: body.userId
            }
          };
        } catch (error: any) {
          throw new CustomError((error as CustomError).message);
        }
      }
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này Orders sẽ chạy lại
       */
      // invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Clients', id: 'LIST' }])
    }),
    getCategory: build.query<ICategory, string>({
      query: (id) => ({
        url: `categories/${id}`,
        headers: {
          hello: 'Im Sang'
        }
      })
    }),
    getCourse: build.query<getCourseResponse, string>({
      query: (id) => ({
        url: `courses/${id}`
      })
    }),
    getCourseEnrolledByUser: build.query<getCourseEnrolledByUserResponse, string>({
      query: (id) => ({
        url: `courses/${id}/enrolled`
        // headers: {
        //   hello: 'Im Sang'
        // }
      }),
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
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Clients' as const, _id })),
              { type: 'Clients' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Orders' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Clients', id: 'LIST' }];
      }
    }),
    getCourseDetail: build.query<getCourseDetailResponse, { courseId: string; userId: string }>({
      query: (params) => {
        return {
          url: `courses/${params.courseId}/detail?userId=${params.userId}`
        };
      }
    }),
    getSectionsByCourseId: build.query<getSectionsResponse, string>({
      query: (courseId) => ({
        url: `sections/${courseId}/course`
        // headers: {
        //   userId: 'Im Sang'
        // }
      })
    }),
    getCertificate: build.query<getCertificateResponse, { courseId: string; userId: string }>({
      query: (params) => ({
        url: `get-certificate`,
        params: params
      })
    }),
    createCertificate: build.mutation<createCertificateResponse, certificateRequest>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: `generate-certificate`,
            method: 'POST',
            body: body
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
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Clients', id: 'LIST' }])
    }),

    getLessonsBySectionId: build.query<getLessonsResponse, { sectionId: string; userId: string }>({
      query: (payload) => ({
        url: `lessons/${payload.sectionId}/section`,
        headers: {
          userId: payload.userId
        }
      })
    }),
    getLessonsBySectionIdEnrolledCourse: build.query<getLessonsResponse, { sectionId: string; userId: string }>({
      query: (payload) => ({
        url: `lessons/${payload.sectionId}/section/course-enrolled`,
        headers: {
          userId: payload.userId
        }
      })
    }),
    getUser: build.query<getUserResponse, string>({
      query: (id) => ({
        url: `users/${id}`
        // headers: {
        //   hello: 'Im Sang'
        // }
      })
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetAuthorsQuery,
  useGetCourseEnrolledByUserQuery,
  useGetCoursesOrderedByUserQuery,
  useGetSectionsByCourseIdQuery,
  useGetLessonsBySectionIdQuery,
  useGetLessonsBySectionIdEnrolledCourseQuery,
  useGetUserQuery,
  useGetUserDetailQuery,
  useGetCourseQuery,
  useGetCourseDetailQuery,
  useCreateOrderMutation,
  useUpdateLessonDoneByUserMutation,
  useGetRetrieveCartQuery,
  useGetCertificateQuery,
  useCreateCertificateMutation
} = clientApi;
