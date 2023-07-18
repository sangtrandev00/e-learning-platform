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
  cart?: ICart;
  //   formData: IClient;
}

const initialState: ClientState = {
  userId: '',
  isAuth: false
};

const orderSlice = createSlice({
  name: 'order',
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
    }
    // handleFormData: (state, action: PayloadAction<IOrder>) => {
    //   state.formData = action.payload;
    // }
  }
});

const orderReducer = orderSlice.reducer;
export const { addToCart, clearCart, removeCart, createOrder } = orderSlice.actions;
export default orderReducer;
