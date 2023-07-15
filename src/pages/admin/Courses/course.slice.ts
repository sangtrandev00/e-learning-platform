import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  postId: string;
}

const initialState: CourseState = {
  postId: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    startEditCourse: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    cancelEditCourse: (state) => {
      state.postId = "";
    },
  },
});

const courseReducer = courseSlice.reducer;
export const { cancelEditCourse, startEditCourse } = courseSlice.actions;
export default courseReducer;
