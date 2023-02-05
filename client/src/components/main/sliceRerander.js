import { createSlice } from "@reduxjs/toolkit";

export const reRander = createSlice({
  name: "rander",
  initialState: { reRanderCounter: 0 },
  reducers: {
    setRander: (state) => {
      state.reRanderCounter = state.reRanderCounter + 1;
    },
  },
});

export default reRander.reducer;
export const { setRander } = reRander.actions;
