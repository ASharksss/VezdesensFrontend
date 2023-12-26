import React from 'react';
import Card from "../../cards/Card";
import ad_image from '../../../asserts/ad_image_small.png'
import {STATIC_HOST} from "../../../utils";

const SmallBlocks = ({items}) => {
  return (
    <div className='flex small align-items'>
      {items !== undefined && items.map((item, index) => (
        <Card classname={'xs'} ad_image={item.previewImageAds.length > 0 ? `${STATIC_HOST}/${item.previewImageAds[0].name}` : ad_image}
							title={item.title} address={item.address} price={item.price}
							favorite={item.favorites} date={item.date} id={item.id} key={`card-${index}-${item.id}`}/>
      ))}
    </div>
  );
};

export default SmallBlocks;