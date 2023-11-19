const { createSlice } = require("@reduxjs/toolkit");

const chartSlice = createSlice({
  name: "chartData",
  initialState: {
    items: null,
  },
  reducers: {
    setChart: (state, action) => {
      state.items = action.payload;
    },
    removeChart: (state, action) => {
      state.items = null;
    },
  },
});

export const { setChart, removeChart } = chartSlice.actions;
export default chartSlice.reducer;
