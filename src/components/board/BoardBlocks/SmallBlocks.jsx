import React from 'react';
import Card from "../../cards/Card";
import ad_image from '../../../asserts/ad_image_small.png'

const SmallBlocks = () => {
  return (
    <div className='flex small_ads'>
      <Card classname={'s'} ad_image={ad_image}/>
      <Card classname={'s'} ad_image={ad_image}/>
      <Card classname={'s'} ad_image={ad_image}/>
      <Card classname={'s'} ad_image={ad_image}/>
      <Card classname={'s'} ad_image={ad_image}/>
    </div>
  );
};

export default SmallBlocks;