import { createSlice } from "@reduxjs/toolkit";

export const chartTypeSlice = createSlice({
  name: "chart",
  initialState: {
    value: "default",
    xName: "",
    yName: "",
  },
  reducers: {
    selectedType: (state, action) => {
      state.value = action.payload
    },
    xAxis: (state, action) => {
      state.xName = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { selectedType } = chartTypeSlice.actions;

export default chartTypeSlice.reducer;
