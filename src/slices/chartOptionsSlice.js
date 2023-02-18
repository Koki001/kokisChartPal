import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartRef: {},
  lineThickness: 2,
  barThickness: 31,
  lineType: "monotone",
  barType: "horizontal",
  showGrid: true,
  showLabels: true,
  showXAxis: true,
  showYAxis: true,
  showBarVal: true,
  rotateLabels: false,
  showLegend: true,
  connectNull: false,
  tickNumber: 10,
  range: false,
};

export const chartOptionsSlice = createSlice({
  name: "options",
  initialState: {
    chartRef: {},
    lineThickness: 2,
    barThickness: 31,
    lineType: "monotone",
    barType: "horizontal",
    showGrid: true,
    showLabels: true,
    showXAxis: true,
    showYAxis: true,
    showBarVal: true,
    rotateLabels: false,
    showLegend: true,
    connectNull: false,
    tickNumber: 10,
    range: false,
  },
  reducers: {
    cChartRef: (state, action) => {
      state.chartRef = action.payload;
    },
    cLineThickness: (state, action) => {
      state.lineThickness = action.payload;
    },
    cBarThickness: (state, action) => {
      state.barThickness = action.payload;
    },
    cLineType: (state, action) => {
      state.lineType = action.payload;
    },
    cBarType: (state, action) => {
      state.barType = action.payload;
    },
    cShowGrid: (state, action) => {
      state.showGrid = action.payload;
    },
    cShowLabels: (state, action) => {
      state.showLabels = action.payload;
    },
    cShowXAxis: (state, action) => {
      state.showXAxis = action.payload;
    },
    cShowYAxis: (state, action) => {
      state.showYAxis = action.payload;
    },
    cShowBarVal: (state, action) => {
      state.showBarVal = action.payload;
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
    cRange: (state, action) => {
      state.range = action.payload;
    },
    RESET_STATE_OPTIONS: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  cLineThickness,
  cBarThickness,
  cLineType,
  cShowGrid,
  cShowLabels,
  cShowXAxis,
  cShowYAxis,
  cShowBarVal,
  cRotateLabels,
  cShowLegend,
  cConnectNull,
  cTickNumber,
  cChartRef,
  cRange,
  RESET_STATE_OPTIONS,
} = chartOptionsSlice.actions;

export default chartOptionsSlice.reducer;
