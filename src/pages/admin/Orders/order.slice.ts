import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../../types/order.type';

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

const orderSlice = createSlice({
  name: 'order',
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

const orderReducer = orderSlice.reducer;
export const { cancelEditOrder, startEditOrder, openCreateOrder } = orderSlice.actions;
export default orderReducer;
