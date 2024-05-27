import React from 'react';
import {Provider} from 'react-redux'
import {store} from "./redux/store";
import ReactDOM from 'react-dom/client';
import App from './App';
import Stub from "./components/Stub/Stub";

const root = ReactDOM.createRoot(document.getElementById('root'));
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
  .test(navigator.userAgent)) {
  window.location.href = 'https://m.vezdesens.ru/'
} else {
  root.render(
    <>
      <Provider store={store}>
        <App/>
      </Provider>
    </>
  );
}

