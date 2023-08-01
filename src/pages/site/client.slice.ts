import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../types/order.type';
import { IParams } from '../../types/params.type';
// import { IOrder } from '../../../types/order.type';
// import { IUser } from '../../types/user.type';
interface ICart {
  items: {
    courseId: string;
  }[];
}

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
  //   formData: IClient;
}

const localCart = JSON.parse(localStorage.getItem('cart') || '{items:[]}') as ICart;

const initialState: ClientState = {
  lessonId: '',
  playingVideo: 'https://www.youtube.com/watch?v=GQ-toR8F7rc&ab_channel=F8Official',
  isLessonDone: false,
  totalLectures: 0,
  totalVideosLength: 0,
  cart: localCart,
  totalCartPrice: 0,
  searchQuery: '',
  params: {}
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        const courseExistingIdx = state.cart.items.findIndex((item) => item.courseId === action.payload);

        if (courseExistingIdx === -1) {
          state.cart.items.push({ courseId: action.payload });
          localStorage.setItem('cart', JSON.stringify(state.cart));
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
  setSearchQuery
} = clientSlice.actions;
export default clientReducer;
