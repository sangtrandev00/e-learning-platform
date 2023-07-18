import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessStatus, CourseLevel, ICourse } from '../../../types/course.type';

interface CourseState {
  courseId: string;
  isOpenCreateCourse: boolean;
  formData: ICourse;
}

const initialState: CourseState = {
  courseId: '',
  isOpenCreateCourse: false,
  formData: {
    _id: '',
    name: '',
    description: '',
    price: 0,
    finalPrice: 0,
    access: AccessStatus.FREE,
    level: CourseLevel.BEGINNER,
    thumbnail: '',
    courseSlug: '',
    categoryId: '646781266859a50acfca8e93',
    userId: '6468a145401d3810494f4797'
  }
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    openCreateCourse: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateCourse = action.payload;
    },
    startEditCourse: (state, action: PayloadAction<string>) => {
      state.courseId = action.payload;
    },
    cancelEditCourse: (state) => {
      state.courseId = '';
    },
    handleFormData: (state, action: PayloadAction<ICourse>) => {
      state.formData = action.payload;
    }
  }
});

const courseReducer = courseSlice.reducer;
export const { cancelEditCourse, startEditCourse, openCreateCourse, handleFormData } = courseSlice.actions;
export default courseReducer;
