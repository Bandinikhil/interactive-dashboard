import chartSlice from "./chartSlice";
import userSlice from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    user: userSlice,
    chartData: chartSlice,
  },
});

export default store;
