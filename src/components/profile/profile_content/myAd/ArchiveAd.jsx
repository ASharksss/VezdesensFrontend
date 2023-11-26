import React from 'react';
import MyAd from "./myAd";

const ArchiveAd = ({typeAd, dataUser, setDataAds}) => {
  return (
    <div>
      {dataUser.ads.length === 0 ? <p>Ничего нет</p>
        : dataUser.ads.map((item, index) => (
					<MyAd key={'archive' + index} typeAd={'archiveAd'} item={item.statusAdId === 4 && item} setDataAds={setDataAds}/>
				))}
    </div>
  );
};

export default ArchiveAd;