import React from 'react';
import Card from "../../cards/Card";
import ad_image from '../../../asserts/ad_image_small.png'
import {STATIC_HOST} from "../../../utils";

const SmallBlocks = ({items}) => {
  return (
    <div className='flex small_ads align-items'>
      {items !== undefined && items.map((item, index) => (
        <Card classname={'xs'} ad_image={item.imageAds.length > 0 ? `${STATIC_HOST}/${item.imageAds[0].name}` : ad_image}
							title={item.title} address={item.address} price={item.price}
							favorite={item.favorites} date={item.date} id={item.id} key={`card-${index}-${item.id}`}/>
      ))}
    </div>
  );
};

export default SmallBlocks;