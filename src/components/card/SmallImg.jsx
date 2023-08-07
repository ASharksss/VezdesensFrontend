import React from 'react';


const SmallImg = ({img, title}) => {
  return (
    <div className='small_img_card'>
      <img src={img} alt={title} className='small_img_card'/>
    </div>
  );
};

export default SmallImg;