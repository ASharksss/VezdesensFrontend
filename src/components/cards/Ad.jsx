import React from 'react';
import ad_img_thin from '../../asserts/ad_img_thin.png'

const Ad = () => {
  return (
    <div>
      <img src={ad_img_thin} alt="реклама" className='card_content-img'/>
    </div>
  );
};

export default Ad;