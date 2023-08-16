import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ICart } from '../../types/cart.type';
import { IParams } from '../../types/params.type';
// import { IOrder } from '../../../types/order.type';
// import { IUser } from '../../types/user.type';

interface ClientState {
  lessonId: string;
  isLessonDone: boolean;
  playingVideo: string;
  totalLectures: number;
  totalVideosLength: number;
  cart: ICart;
  totalCartPrice: number;
  searchQuery: string;
  params: IParams;
  lessonIdsDoneByCourseId: string[];
  currentProgress: number;
  certificatePath: string;
  isLessonChange: boolean;
  //   formData: IClient;
}

const storedCart = JSON.parse(localStorage.getItem('cart') || '{}') as ICart;

const localCart = {
  items: storedCart.items || []
};

const initialState: ClientState = {
  lessonId: '',
  playingVideo: 'https://www.youtube.com/watch?v=GQ-toR8F7rc&ab_channel=F8Official',
  isLessonDone: false,
  totalLectures: 0,
  totalVideosLength: 0,
  cart: localCart,
  totalCartPrice: 0,
  searchQuery: '',
  params: {},
  lessonIdsDoneByCourseId: [],
  currentProgress: 0,
  certificatePath: '',
  isLessonChange: false
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        console.log('state cart: ', state.cart);

        // const cartItems = state.cart.items;

        // if (cartItems) {
        //   state.cart.items = [];
        // }
        // console.log('state cart items: ', state.cart.items);
        const courseExistingIdx = state.cart.items.findIndex((item) => item.courseId === action.payload);

        if (courseExistingIdx === -1) {
          state.cart.items.push({ courseId: action.payload });
          // state.cart.items = [...state.cart.items, { courseId: action.payload }];

          const cartForStorage = {
            items: state.cart.items
          };

          localStorage.setItem('cart', JSON.stringify(cartForStorage));
          notification.success({
            message: 'Add to cart successfully!'
          });
        }
      } else {
        console.log('_id is null');
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const courseExistingIdx = state.cart.items.findIndex((item) => item.courseId === action.payload);
      if (courseExistingIdx >= 0) {
        state.cart.items.splice(courseExistingIdx, 1);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    // createOrder: (state, action: PayloadAction<Omit<IOrder, "_id">) => {
    //   state.state = action.payload;
    // },
    startPlayingVideo: (state, action: PayloadAction<{ lessonId: string; content: string }>) => {
      state.playingVideo = action.payload.content;
      state.lessonId = action.payload.lessonId;
    },
    setCurrentLessonDone: (state) => {
      state.isLessonDone = true;
    },
    calcTotalLectures: (state, action: PayloadAction<number>) => {
      state.totalLectures += action.payload;
    },
    calcTotalVideosLength: (state, action: PayloadAction<number>) => {
      state.totalVideosLength += action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    initLessonsDoneOfCourse: (state, action: PayloadAction<string[]>) => {
      state.lessonIdsDoneByCourseId = action.payload;
    },
    updateLessonDoneAtBrowser: (state, action: PayloadAction<string>) => {
      const existingLessonId = state.lessonIdsDoneByCourseId.findIndex((lessonId) => lessonId === action.payload);
      if (existingLessonId === -1) {
        state.lessonIdsDoneByCourseId.push(action.payload);
      }
    },
    initCurrentProgress: (state, action: PayloadAction<number>) => {
      state.currentProgress = action.payload;
    },
    createCertificatePath: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.certificatePath = action.payload;
      }
    },
    updateCurrentProgress: (state, action: PayloadAction<number>) => {
      state.currentProgress += action.payload;
    },
    updateIsLessonChange: (state, action: PayloadAction<string>) => {
      if (state.lessonId !== action.payload) {
        state.isLessonChange = true;
      } else {
        state.isLessonChange = false;
      }
    },
    resetLessonChange: (state) => {
      state.isLessonChange = false;
    }
    // handleFormData: (state, action: PayloadAction<IOrder>) => {
    //   state.formData = action.payload;
    // }
  }
});

const clientReducer = clientSlice.reducer;
export const {
  addToCart,
  clearCart,
  removeCart,
  startPlayingVideo,
  calcTotalLectures,
  calcTotalVideosLength,
  setCurrentLessonDone,
  setSearchQuery,
  initLessonsDoneOfCourse,
  updateLessonDoneAtBrowser,
  initCurrentProgress,
  updateCurrentProgress,
  createCertificatePath,
  updateIsLessonChange,
  resetLessonChange
  // refetchCourseEnrolledbyUser
} = clientSlice.actions;
export default clientReducer;
