import React, {useEffect} from "react";
import './App.css';
import './reset.css'
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "./utils";
import {fetchAuth} from "./redux/slices/userSlice";
import {privateRoutes, publicRoutes} from "./routes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.";

axios.defaults.baseURL = 'http://localhost:5000/';
// axios.defaults.baseURL = 'http://192.168.1.115:5000/';
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(state => state.user)

  useEffect(() => {
    function checkAuth() {
      const checkSession = getCookie('session')
      if (checkSession !== undefined) {
         dispatch(fetchAuth(checkSession))
      }
    }

    return checkAuth()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<Layout/>}>
          {publicRoutes.map(({key, path, Component}) => (
            <Route key={key} path={path} element={<Component/>}/>
          ))}
        </Route>
        {isAuth &&
          <Route path="/" element={<Layout/>}>
            {privateRoutes.map(({key, path, Component}) => (
              <Route key={key} path={path} element={<Component/>}/>
            ))}
          </Route>}
        {/*<Route path="*" element={<Error404Page/>}/>*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
