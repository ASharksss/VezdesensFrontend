import React from 'react';


const SmallImg = ({img, title, setCheckedIndex, index=0, checkedIndex=1}) => {
  return (
    <div key={`image#${index}-${title}`} onClick={() => setCheckedIndex(index)} className='small_img_card' data-fancybox="gallery" data-src={img}
			style={index !== checkedIndex ? {opacity: 0.5} : {opacity: 1}}>
      <img src={img} alt={title} className='small_img_card'/>
    </div>
  );
};

export default SmallImg;