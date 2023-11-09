import React from 'react';
import MyAd from "./myAd";

const ActiveAds = ({dataUser}) => {

  return (
    <div>
      {dataUser.ads.length === 0 ?
        <div className=" myAd_container flex">
          <p>Ничего нет</p>
        </div>
        : <MyAd typeAd={'activeAd'} dataUser={dataUser}/>}
    </div>
  );
};

export default ActiveAds;