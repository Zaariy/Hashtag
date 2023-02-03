import { configureStore } from "@reduxjs/toolkit";
import setTokenUserSlice from "../components/singIn/sliceSetToken";
import userData from "../components/singIn/sliceUserData";
import public_ps from "../components/main/slicePublicPostes";

export default configureStore({
  reducer: {
    setTokenUser: setTokenUserSlice,
    userData: userData,
    public_postes: public_ps,
  },
});
