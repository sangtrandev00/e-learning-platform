import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categoryId: string;
  isOpenCreateCategory: boolean;
  //   formData: ICategory;
}

const initialState: CategoryState = {
  categoryId: '',
  isOpenCreateCategory: false
  //   formData: {
  //     _id: '',
  //     name: '',
  //     description: '',
  //     price: 0,
  //     finalPrice: 0,
  //     access: AccessStatus.FREE,
  //     level: CategoryLevel.BEGINNER,
  //   }
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    openCreateCategory: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateCategory = action.payload;
    },
    startEditCategory: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    cancelEditCategory: (state) => {
      state.categoryId = '';
    }
    // handleFormData: (state, action: PayloadAction<ICategory>) => {
    //   state.formData = action.payload;
    // }
  }
});

const categoryReducer = categorySlice.reducer;
export const { cancelEditCategory, startEditCategory, openCreateCategory } = categorySlice.actions;
export default categoryReducer;
