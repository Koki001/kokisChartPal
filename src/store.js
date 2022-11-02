import { configureStore } from "@reduxjs/toolkit";
import chartTypeSlice from "./features/chartTypeSlice";

export default configureStore({
  reducer: {
    chart: chartTypeSlice
  },
});
