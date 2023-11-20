import React from 'react';
import MyAd from "./myAd";

const ActiveAds = ({dataUser}) => {

  return (
    <div>
      {dataUser.ads.length === 0 ?
        <div className=" myAd_container flex">
          <p>Ничего нет</p>
        </div>
        : dataUser.ads.map((item, index) => ( <MyAd key={'active' + index} typeAd={'activeAd'} item={item.statusAdId === 2 && item}/>))}
    </div>
  );
};

export default ActiveAds;