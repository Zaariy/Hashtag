import { createSlice } from "@reduxjs/toolkit";

export const setTokenUserSlice = createSlice({
  name: "dataToken",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    deleteToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, deleteToken } = setTokenUserSlice.actions;
export default setTokenUserSlice.reducer;
