import React, {useEffect, useState} from "react";
import './App.css';
import './reset.css'
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Layout from "./Layout";
import {getCookie} from "./utils";
import {fetchAuth} from "./redux/slices/userSlice";
import {takeFromCookie} from "./redux/slices/geoSlice";
import {privateRoutes, publicRoutes} from "./routes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.";
import ForgotPassword from "./pages/ForgotPassword";
import AddPage from "./pages/admin/Characteristics/AddPage";
import AddObject from "./pages/admin/Characteristics/addObject";
import SupportPage from "./pages/admin/support/SupportPage";
import SignUpCompanies from "./pages/SignUpCopmanies.";


// axios.defaults.baseURL = 'http://192.168.1.119:5000/';
// axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.baseURL = 'https://backend.vezdesens.ru/';
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const {isAuth, user} = useSelector(state => state.user)

  const loadingIsAuth = user.status === 'loading'

  useEffect(() => {
    function checkAuth() {
      const checkSession = getCookie('session')
      if (checkSession !== undefined) {
         dispatch(fetchAuth(checkSession))
      }
    }
    return checkAuth()
  }, [])

  useEffect(() => {
    function checkPosition() {
      const checkGeo = getCookie('position')
      if (checkGeo !== undefined) {
         dispatch(takeFromCookie(checkGeo))
      }
    }
    return checkPosition()
  }, [])

  useEffect(() => {
    if (!loadingIsAuth) {
      setLoading(false)
    }
  }, [loading])


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/addPage" element={<AddPage/>}/>
          <Route path="/addObject" element={<AddObject/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signupCompanies" element={<SignUpCompanies/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/supportPage" element={<SupportPage/>}/>

        </Route>
        <Route path="/" element={<Layout/>}>
          {publicRoutes.map(({key, path, Component}) => (
            <Route key={`public-${key}`} path={path} element={<Component/>}/>
          ))}
        </Route>
        {(isAuth && !loadingIsAuth) ?
          <Route path="/" element={<Layout/>}>
            {privateRoutes.map(({key, path, Component}) => (
              <Route key={`private-${key}`} path={path} element={<Component/>}/>
            ))}
          </Route> : null}
        {/*<Route path="*" element={<Error404Page/>}/>*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
