import React from 'react';
import MyAd from "./myAd";

const ActiveAds = () => {
  return (
    <div>
      <MyAd typeAd={'activeAd'}/>
      <MyAd typeAd={'activeAd'}/>
      <MyAd typeAd={'activeAd'}/>
    </div>
  );
};

export default ActiveAds;