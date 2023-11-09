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
            <CardAd/>
        </div>
    </div>
  );
};

export default CardPage;