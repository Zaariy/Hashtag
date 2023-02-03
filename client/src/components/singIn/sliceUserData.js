import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
  name: "datauser",
  initialState: { data: "" },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload.userdata;
    },
  },
});

export const { setUserData } = userData.actions;
export default userData.reducer;
