import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CourseState {
  userId: string;
  isOpenCreateUser: boolean;
  //   formData: IUser;
}

const initialState: CourseState = {
  userId: '',
  isOpenCreateUser: false
  //   formData: {
  //     _id: '',
  //     name: '',
  //     description: '',
  //     price: 0,
  //     finalPrice: 0,
  //     access: AccessStatus.FREE,
  //     level: CourseLevel.BEGINNER,
  //     thumbnail: '',
  //     courseSlug: '',
  //     categoryId: '646781266859a50acfca8e93',
  //     userId: '6468a145401d3810494f4797'
  //   }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openCreateUser: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateUser = action.payload;
    },
    startEditUser: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    cancelEditUser: (state) => {
      state.userId = '';
    }
    // handleFormData: (state, action: PayloadAction<IUser>) => {
    //   state.formData = action.payload;
    // }
  }
});

const userReducer = userSlice.reducer;
export const { cancelEditUser, startEditUser, openCreateUser } = userSlice.actions;
export default userReducer;
