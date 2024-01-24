import React, {useEffect, useState} from 'react';
import Ad from "../components/cards/Ad";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";
import CardAd from "../components/card/CardAd";
import {getStaticAd, STATIC_HOST} from "../utils";

const CardPage = () => {
    const [staticAd, setStaticAd] = useState([])
    useEffect(() => {
        getStaticAd(1, setStaticAd)
    }, [])
  return (
    <div className='container'>
        <Ad image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[0]?.href}/>
        <div className="wrapper">
            <BreadCrumbs/>
            <CardAd/>
        </div>
    </div>
  );
};

export default CardPage;
