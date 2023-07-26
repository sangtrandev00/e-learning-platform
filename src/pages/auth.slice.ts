import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orderId: string;
  isOpenCreateOrder: boolean;
  //   formData: IOrder;
}

const initialState: OrderState = {
  orderId: '',
  isOpenCreateOrder: false
  //   formData: {
  //     _id: '',
  //     name: '',
  //     description: '',
  //     price: 0,
  //     finalPrice: 0,
  //     access: AccessStatus.FREE,
  //     level: OrderLevel.BEGINNER,
  //   }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openCreateOrder: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateOrder = action.payload;
    },
    startEditOrder: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    cancelEditOrder: (state) => {
      state.orderId = '';
    }
    // handleFormData: (state, action: PayloadAction<IOrder>) => {
    //   state.formData = action.payload;
    // }
  }
});

const authReducer = authSlice.reducer;
export const { cancelEditOrder, startEditOrder, openCreateOrder } = authSlice.actions;
export default authReducer;
