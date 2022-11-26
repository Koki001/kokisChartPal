import { configureStore } from "@reduxjs/toolkit";
import chartTypeSlice from "./features/chartTypeSlice";
import chartOptionsSlice from "./features/chartOptionsSlice";

export default configureStore({
  reducer: {
    chart: chartTypeSlice,
    options: chartOptionsSlice 
  },
});
