import { configureStore } from "@reduxjs/toolkit";
import chartMainSlice from "./slices/chartMainSlice";
import chartOptionsSlice from "./slices/chartOptionsSlice";

export default configureStore({
  reducer: {
    chart: chartMainSlice,
    options: chartOptionsSlice 
  },
});
