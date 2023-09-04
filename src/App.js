import './App.css';
import './reset.css'
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CardPage from "./pages/CardPage";
import ProfilePage from "./pages/ProfilePage";
import Messages from "./components/profile/profile_content/messages/messages";
import Dialog from "./components/profile/profile_content/messages/Dialog";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/card'} element={<CardPage/>}/>
          <Route path={'/myProfile'} element={<ProfilePage/>}/>
          <Route path={'/myProfile/messages'} element={<Dialog/>}/>
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
