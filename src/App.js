import './App.css';
import './reset.css'
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CardPage from "./pages/CardPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Layout";
import CatalogBoardPage from "./pages/CatalogBoardPage";
import Auth from "./pages/Auth";
import SignIn from "./pages/SignIn.";
import CreateAdPage from "./pages/CreateAdPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path={'/auth'} element={<Auth/>}/>
            <Route path={'/signin'} element={<SignIn/>}/>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/category'} element={<CatalogBoardPage/>}/>
                <Route path={'/card/:id'} element={<CardPage/>}/>
                <Route path={'/myProfile/:id'} element={<ProfilePage/>}/>
                <Route path={'/createAd'} element={<CreateAdPage/>}/>
            </Route>

        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
