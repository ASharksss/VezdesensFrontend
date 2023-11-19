import React, {useEffect} from "react";
import './App.css';
import './reset.css'
import axios from "axios";
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CardPage from "./pages/CardPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Layout";
import CatalogBoardPage from "./pages/CatalogBoardPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.";
import CreateAdPage from "./pages/CreateAdPage";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "./utils";
import {fetchAuth} from "./redux/slices/userSlice";

axios.defaults.baseURL = 'http://localhost:5000/';

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
            <div className="App">
                <Routes>
                    {!isAuth &&
                        <>
                            <Route path={'/signin'} element={<SignIn/>}/>
                            <Route path={'/signup'} element={<SignUp/>}/>
                        </>}
                    <Route path={'/'} element={<Layout/>}>
                        <Route path={'/'} element={<MainPage/>}/>
                        <Route path={'/category'} element={<CatalogBoardPage/>}/>
                        <Route path={'/card/:id'} element={<CardPage/>}/>
                        <Route path={'/profile/:id'} element={<ProfilePage/>}/>
                        <Route path={'/createAd'} element={<CreateAdPage/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>

    );
}

export default App;
