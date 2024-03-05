import React from 'react';
import MyAd from "./myAd";

const ArchiveAd = ({dataUser, setDataAds, loading}) => {
	if (loading) {
		return (
			<div>
				Загрузка...
			</div>
		)
	}
  return (
    <div>
      {dataUser.ads.length === 0 ? <p>Ничего нет</p>
        : dataUser.ads.map((item, index) => (
					<MyAd key={'archive' + index} typeAd={'archiveAd'} item={(item.statusAdId === 4 || item.statusAdId === 3) && item} setDataAds={setDataAds}/>
				))}
    </div>
  );
};

export default ArchiveAd;
