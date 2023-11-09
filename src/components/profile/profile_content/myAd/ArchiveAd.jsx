import React from 'react';
import MyAd from "./myAd";

const ArchiveAd = ({typeAd, dataUser}) => {
  return (
    <div>
      {dataUser.ads.length === 0 ? <p>Ничего нет</p>
        : <MyAd typeAd={'archiveAd'} dataUser={dataUser}/>}
    </div>
  );
};

export default ArchiveAd;