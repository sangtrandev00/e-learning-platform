import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessStatus, CourseLevel, ICourse } from '../../../types/course.type';
import Chart from './Dashboard/components/Chart';

interface reportState {
  courseId: string;
  isOpenCreateCourse: boolean;
  sectionId: string;
  isOpenAddSectionModal: boolean;
  chartName: string;
  previousDaysSelected: number;
}

const initialState: reportState = {
  courseId: '',
  isOpenCreateCourse: false,
  sectionId: '',
  isOpenAddSectionModal: false,
  chartName: 'revenues',
  previousDaysSelected: 7
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    showChart: (state, action: PayloadAction<string>) => {
      state.chartName = action.payload;
    },
    selectPreviousDays: (state, action: PayloadAction<number>) => {
      state.previousDaysSelected = action.payload;
    }
  }
});

const reportReducer = reportSlice.reducer;
export const { showChart, selectPreviousDays } = reportSlice.actions;
export default reportReducer;
