import React from 'react';
import Card from "../../cards/Card";
import ad_image_xl from '../../../asserts/ad_image_xl.png'
import ad_image_xs from '../../../asserts/ad_image_xs.png'

const CommercialBlocksXl = () => {
  return (
    <div className='flex'>
      <Card classname={'xs'} ad_image={ad_image_xs}/>
      <Card classname={'xl'} ad_image={ad_image_xl}/>
      <Card classname={'xs'} ad_image={ad_image_xs}/>
    </div>
  );
};

export default CommercialBlocksXl;