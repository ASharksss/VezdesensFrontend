import React, {useEffect, useMemo} from 'react';
import './board.css'
import {useDispatch, useSelector} from "react-redux";
import Card from "../cards/Card";
import SmallBlocks from "./BoardBlocks/SmallBlocks";
import Ad from "../cards/Ad";
import CommercialBlocksXl from "./BoardBlocks/CommercialBlocksXL";
import ad_image_xxl from '../../asserts/ad_image_xxl.png'
import {fetchAllAds} from "../../redux/slices/boardSlice";
import {InfiniteScroll} from "./InfiniteScroll"
import {group} from "../../utils";
import {useLocation} from "react-router-dom";

const Board = () => {

  const location = useLocation();
  const dispatch = useDispatch()
  const {ads} = useSelector(state => state.ads)

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(fetchAllAds(0))
    }
  }, [location.pathname])

  const loading = ads.status === 'loading'

  const handleAds = useMemo(() => {
    if (!loading && ads.items.length > 0) {
      const data = ads.items.filter(item => item.typeAdId === 1);
      const groupData = group(data, 5, 3); // 5x3
      return groupData.map((arrays, index) => (
        <SmallBlocks
          key={index}
          items={arrays}
          loading={loading}
        />
      ));
    } else {
      return null; // Возвращаемое значение, если !loading
    }
  }, [ads.items, loading]);
  return (
    <>
      <InfiniteScroll>
        <Card classname={'xxl'} ad_image={ad_image_xxl}/>

        <Ad/>

        <CommercialBlocksXl/>

        <Ad />

        {handleAds}
        {/*<CommercialBlocksLss/>*/}

      </InfiniteScroll>
    </>
  );
};

export default Board;