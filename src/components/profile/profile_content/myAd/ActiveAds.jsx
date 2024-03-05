import React from 'react';
import MyAd from "./myAd";

const ActiveAds = ({dataUser, setDataAds, loading, status}) => {
	if (loading) {
		return (
			<div>
				Загрузка...
			</div>
		)
	}

  return (
    <div>
      {dataUser.ads.length === 0 || status === false ?
        
          <p className='flex jy-center items-center h-200'>Ничего нет</p>
        : dataUser.ads.map((item, index) => (
					<MyAd key={'active' + index} typeAd={'activeAd'} item={item.statusAdId === 2 && item} setDataAds={setDataAds}/>
				))}
    </div>
  );
};

export default ActiveAds;