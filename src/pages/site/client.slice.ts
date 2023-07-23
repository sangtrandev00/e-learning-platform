import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IOrder } from '../../../types/order.type';
// import { IUser } from '../../types/user.type';
interface ICart {
  cart: {
    items: {
      courseId: string;
    }[];
  };
}

interface ClientState {
  userId: string;
  isAuth: boolean;
  playingVideo: string;
  totalLectures: number;
  totalVideosLength: number;
  cart?: ICart;
  //   formData: IClient;
}

const initialState: ClientState = {
  userId: '',
  isAuth: false,
  playingVideo: 'https://www.youtube.com/watch?v=GQ-toR8F7rc&ab_channel=F8Official',
  totalLectures: 0,
  totalVideosLength: 0
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userId = '';
    },
    addToCart: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    },
    clearCart: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    },
    removeCart: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    },
    createOrder: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    },
    startPlayingVideo: (state, action: PayloadAction<string>) => {
      state.playingVideo = action.payload;
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
export const {
  addToCart,
  clearCart,
  removeCart,
  createOrder,
  startPlayingVideo,
  calcTotalLectures,
  calcTotalVideosLength
} = clientSlice.actions;
export default clientReducer;
