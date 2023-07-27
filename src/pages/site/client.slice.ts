import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../types/order.type';
// import { IOrder } from '../../../types/order.type';
// import { IUser } from '../../types/user.type';
interface ICart {
  items: {
    courseId: string;
  }[];
}

interface ClientState {
  userId: string;
  isAuth: boolean;
  lessonId: string;
  playingVideo: string;
  totalLectures: number;
  totalVideosLength: number;
  cart: ICart;
  totalCartPrice: number;
  //   formData: IClient;
}

const localCart = JSON.parse(localStorage.getItem('cart') || '{items:[]}') as ICart;

const initialState: ClientState = {
  userId: '',
  isAuth: false,
  lessonId: '',
  playingVideo: 'https://www.youtube.com/watch?v=GQ-toR8F7rc&ab_channel=F8Official',
  totalLectures: 0,
  totalVideosLength: 0,
  cart: localCart,
  totalCartPrice: 0
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userId = '';
    },
    addToCart: (state, action: PayloadAction<string>) => {
      const courseExistingIdx = state.cart.items.findIndex((item) => item.courseId === action.payload);

      if (courseExistingIdx === -1) {
        state.cart.items.push({ courseId: action.payload });
        localStorage.setItem('cart', JSON.stringify(state.cart));
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
    calcTotalLectures: (state, action: PayloadAction<number>) => {
      state.totalLectures += action.payload;
    },
    calcTotalVideosLength: (state, action: PayloadAction<number>) => {
      state.totalVideosLength += action.payload;
    }
    // handleFormData: (state, action: PayloadAction<IOrder>) => {
    //   state.formData = action.payload;
    // }
  }
});

const clientReducer = clientSlice.reducer;
export const { addToCart, clearCart, removeCart, startPlayingVideo, calcTotalLectures, calcTotalVideosLength } =
  clientSlice.actions;
export default clientReducer;
