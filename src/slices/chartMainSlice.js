import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "default",
  dataPoints: [],
  xTitle: "",
  yTitle: "",
  data: [],
  dataset: {},
};
export const chartMainSlice = createSlice({
  name: "chart",
  initialState: {
    value: "default",
    dataPoints: [],
    xTitle: "",
    yTitle: "",
    data: [],
    dataset: {},
  },
  reducers: {
    selectedType: (state, action) => {
      state.value = action.payload;
    },
    dataPointNum: (state, action) => {
      state.dataPoints = action.payload;
    },
    addXTitle: (state, action) => {
      state.xTitle = action.payload;
    },
    addYTitle: (state, action) => {
      state.yTitle = action.payload;
    },
    addChartData: (state, action) => {
      state.data = action.payload;
    },
    addDataset: (state, action) => {
      state.dataset = action.payload;
    },
    RESET_STATE_MAIN: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  selectedType,
  dataPointNum,
  addXTitle,
  addYTitle,
  addChartData,
  addDataset,
  RESET_STATE_MAIN,
} = chartMainSlice.actions;

export default chartMainSlice.reducer;
