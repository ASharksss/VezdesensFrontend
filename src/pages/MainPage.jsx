import React, {useEffect} from 'react';

import Board from "../components/board/Board";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllAds} from "../redux/slices/boardSlice";



const MainPage = () => {


  return (
    <div className='container'>
      <Board/>
    </div>
  );
};

export default MainPage;