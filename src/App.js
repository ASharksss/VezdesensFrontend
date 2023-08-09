import './App.css';
import './reset.css'
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CardPage from "./pages/CardPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/card'} element={<CardPage/>}/>
          <Route path={'/myProfile'} element={<ProfilePage/>}/>
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
