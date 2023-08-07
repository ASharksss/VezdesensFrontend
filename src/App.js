import './App.css';
import './reset.css'
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import CardPage from "./pages/CardPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/card'} element={<CardPage/>}/>
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
