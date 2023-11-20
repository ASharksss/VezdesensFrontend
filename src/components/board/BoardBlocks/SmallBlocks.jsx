import React from 'react';
import Card from "../../cards/Card";
import ad_image from '../../../asserts/ad_image_small.png'

const SmallBlocks = ({items}) => {
  return (
    <div className='flex small_ads align-items'>
      {items !== undefined && items.map(item => (
        <Card classname={'xs'} ad_image={ad_image} title={item.title} address={item.address} price={item.price}
							favorite={item.favorites} date={item.date} id={item.id} key={`card-${item.id}`}/>
      ))}
    </div>
  );
};

export default SmallBlocks;