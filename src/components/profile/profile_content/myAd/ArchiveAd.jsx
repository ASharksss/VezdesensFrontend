import React from 'react';
import MyAd from "./myAd";

const ArchiveAd = ({typeAd}) => {
  return (
    <div>
      <MyAd typeAd={'archiveAd'}/>
      <MyAd typeAd={'archiveAd'}/>
      <MyAd typeAd={'archiveAd'}/>
    </div>
  );
};

export default ArchiveAd;