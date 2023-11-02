import React, {useEffect} from 'react';

import Board from "../components/board/Board";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllAds} from "../redux/slices/boardSlice";



const MainPage = () => {
  const dispatch = useDispatch()
  const {ads} = useSelector(state => state.ads)

  useEffect(() => {
    console.log({ads})
    dispatch(fetchAllAds())
  }, [])

  return (
    <div className='container'>
      <Board ads={ads}/>
    </div>
  );
};

export default MainPage;