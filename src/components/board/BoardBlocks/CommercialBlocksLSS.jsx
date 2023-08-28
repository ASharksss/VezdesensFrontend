import React from 'react';
import Card from "../../cards/Card";
import ad_image_s from '../../../asserts/ad_image_s.png'
import ad_image_l from '../../../asserts/ad_image_l.png'

const CommercialBlocksLss = () => {
  return (
    <>
      <div className='flex'>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'l'} ad_image={ad_image_l}/>
      </div>
      <div className='flex'>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'l'} ad_image={ad_image_l}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
      </div>
      <div className='flex'>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'l'} ad_image={ad_image_l}/>
      </div>
      <div className='flex'>
        <Card classname={'l'} ad_image={ad_image_l}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
      </div>
      <div className='flex'>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'l'} ad_image={ad_image_l}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
      </div>
      <div className='flex'>
        <Card classname={'l'} ad_image={ad_image_l}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
        <Card classname={'s'} ad_image={ad_image_s}/>
      </div>
    </>
  );
};

export default CommercialBlocksLss;