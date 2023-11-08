import React, {useEffect} from 'react';
import './card.css'
import CardImgBlock from "./CardImgBlock";
import CardDescription from "./card_description";
import CardInfo from "./card_info";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneAd} from "../../redux/slices/adSlice";

const CardAd = ({ad_name, ad_address}) => {

  const dispatch = useDispatch()
  const {ad} = useSelector(state => state.ad)

  useEffect(() => {
    dispatch(fetchOneAd)
  }, [])

  return (
    <div>
      <h1 className='card_ad_name'>{ad_name}</h1>
      <div className="flex">
        <CardImgBlock ad_address={ad_address}/>
        <CardDescription card_number={'№2571607180'} card_time={'сегодня в 13:04'}
                         card_views={'1666'}/>
        <CardInfo/>
      </div>

    </div>
  );
};

export default CardAd;