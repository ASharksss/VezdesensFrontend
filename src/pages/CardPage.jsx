import React from 'react';
import Ad from "../components/cards/Ad";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";
import CardAd from "../components/card/CardAd";

const CardPage = () => {
  return (
    <div className='container'>
      <Ad/>
        <div className="wrapper">
            <BreadCrumbs/>
            <CardAd ad_name={'iPhone 14 pro max 256gb'} ad_address={'Республика Татарстан, Казань, Петербургская ул., 9'}/>
        </div>
    </div>
  );
};

export default CardPage;