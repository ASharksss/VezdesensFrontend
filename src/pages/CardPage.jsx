import React from 'react';
import Ad from "../components/cards/Ad";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";
import CardAd from "../components/card/CardAd";
import ad_bannerVlaga from "../asserts/adVlaga.png";

const CardPage = () => {
  return (
    <div className='container'>
      <Ad image={ad_bannerVlaga}/>
        <div className="wrapper">
            <BreadCrumbs/>
            <CardAd/>
        </div>
    </div>
  );
};

export default CardPage;