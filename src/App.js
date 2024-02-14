import React, {useEffect, useState} from "react";
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
import Characteristic from "./pages/admin/Characteristic";
import AddPage from "./pages/admin/AddPage";
import AddCategory from "./pages/admin/addCategory";
import AddSubCategory from "./pages/admin/addSubCategory";
import AddObject from "./pages/admin/addObject";


axios.defaults.baseURL = 'http://localhost:5000/';
//axios.defaults.baseURL = 'https://backend.vezdesens.ru/';
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
    if (!loadingIsAuth) {
      setLoading(false)
    }
  }, [loading])


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Route>
        <Route path="/addPage" element={<AddPage/>}/>
        <Route path="/addSubCategory" element={<AddSubCategory/>}/>
        <Route path="/addObject" element={<AddObject/>}/>
        <Route path="/characteristic" element={<Characteristic/>}/>
        <Route path="/addCategory" element={<AddCategory/>}/>
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
