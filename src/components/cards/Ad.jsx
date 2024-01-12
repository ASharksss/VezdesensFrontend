import React from 'react';
import ad_img_thin from '../../asserts/ad_img_thin.png'

const Ad = ({image}) => {
  return (
    <div className='thin flex jy-center'>
      <img src={image ? image : ad_img_thin} alt="реклама" className='card_content-img'/>
    </div>
  );
};

export default Ad;