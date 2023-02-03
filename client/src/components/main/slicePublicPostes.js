import { createSlice } from "@reduxjs/toolkit";

export const public_ps = createSlice({
  name: "publicdata",
  initialState: { postes: [] },
  reducers: {
    setPostesData: (state, action) => {
      state.postes = action.payload.datapostes;
    },
  },
});
export const { setPostesData } = public_ps.actions;
export default public_ps.reducer;
