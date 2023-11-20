import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllAds} from "../redux/slices/boardSlice";


const Test = () => {
  const dispatch = useDispatch()
  const {ads} = useSelector(state => state.ads)
  const [adData, setAdData] = useState([])

  useEffect(() => {
    dispatch(fetchAllAds(0))
  }, [])

  console.log(ads.items)
  return (
    <div>
      {
        ads.items.map((items) => (
          <div>{items.title}</div>
        ))
      }
    </div>
  );
};

export default Test;