import React, {useEffect, useState} from 'react';
import './card.css'
import CardImgBlock from "./CardImgBlock";
import CardDescription from "./card_description";
import CardInfo from "./card_info";
import {useParams} from "react-router-dom";
import axios from "axios";

const CardAd = () => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState()
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/ad/getOneAd/${id}`).then(res => {
      setData(res.data)
      setIsLoading(true)
    }).catch(err => {
      console.warn(err)
      alert('Ошибка получения объявления')
    })
  }, [])

  console.log(data)

  if(!isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className='card_ad_name'>{data.ad.title}</h1>
      <div className="flex">
        <CardImgBlock ad_address={data.ad.address}/>
        <CardDescription card_number={`№ ${data.ad.id}`} card_time={data.ad.createdAt}
                         card_views={data.viewsCount} desription={data.ad.description}/>
        <CardInfo price={data.ad.price} address={data.ad.address}
                  sellerCreated={data.ad.user.createdAt} userId={data.ad.user.id}
                  sellerName={data.ad.user.name}/>
      </div>

    </div>
  );
};

export default CardAd;