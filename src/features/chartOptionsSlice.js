import { createSlice } from "@reduxjs/toolkit";

export const chartOptionsSlice = createSlice({
  name: "options",
  initialState: {
    chartRef: {},
    lineThickness: 2,
    lineType: "monotone",
    showGrid: true,
    showLabels: true,
    rotateLabels: false,
    showLegend: true,
    connectNull: false,
    tickNumber: 10,
  },
  reducers: {
    cChartRef: (state, action) => {
      state.ChartRef = action.payload;
    },
    cLineThickness: (state, action) => {
      state.lineThickness = action.payload;
    },
    cLineType: (state, action) => {
      state.lineType = action.payload;
    },
    cShowGrid: (state, action) => {
      state.showGrid = action.payload;
    },
    cShowLabels: (state, action) => {
      state.showLabels = action.payload;
    },
    cRotateLabels: (state, action) => {
      state.rotateLabels = action.payload;
    },
    cShowLegend: (state, action) => {
      state.showLegend = action.payload;
    },
    cConnectNull: (state, action) => {
      state.connectNull = action.payload;
    },
    cTickNumber: (state, action) => {
      state.tickNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { cLineThickness, cLineType, cShowGrid, cShowLabels, cRotateLabels, cShowLegend, cConnectNull, cTickNumber, cChartRef} = chartOptionsSlice.actions;

export default chartOptionsSlice.reducer;
