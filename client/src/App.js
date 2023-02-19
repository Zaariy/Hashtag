import "./App.css";
import SingUp from "./components/singUp/SingUp";
import Login from "./components/singIn/LogIn";
import axios from "axios";
import Search from "./components/search/Search.jsx";
import MainPage from "./components/main/Mainpage.jsx";
import Profile from "./components/profile/Profile";
import SettingsProfile from "./components/settingsProfile/Settingsprofile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./components/singIn/sliceUserData";
import { setPostesData } from "./components/main/slicePublicPostes";
import { decodeJWTtoken } from "./utils/helperFunctions";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [tokenVerify, setStateToken] = useState(false);
  /*
   * reRander : if user update any kind of data in database we'll fetch new data by re-rander
   * reRander <App> component
   */
  const reRander = useSelector(
    (state) => state.randerComponents.reRanderCounter
  );

  useEffect(() => {
    axios
      .get(`/api/verify_token?token=${localStorage.getItem("token")}`)
      .then((res) => {
        setStateToken(res.data.token);

        if (res.data.token) {
          // load user  data from databases
          axios({
            url: "/api/userinfo",
            method: "POST",
            data: {
              id_user_platform: decodeJWTtoken(localStorage.getItem("token"))
                .id_user_platform,
              token: localStorage.getItem("token"),
            },
          }).then((res2) => {
            dispatch(setUserData({ userdata: res2.data }));
          });

          // load public postes from databases
          axios({
            url: "/uploads/public_postes",
            method: "POST",
            data: {
              token: localStorage.getItem("token"),
            },
          }).then((response) => {
            dispatch(setPostesData({ datapostes: response.data.postes }));
          });
        }
      });
  }, [reRander]);

  return (
    <BrowserRouter>
      <Routes>
        {tokenVerify ? (
          <>
            <Route path="/home" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<SettingsProfile />} />
            <Route path="/search" element={<Search />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}

        <Route path="/singup" element={<SingUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/singin" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
