import React from 'react';
import './cards.css'
import CardContentXS from "./card_content/card_content_XS";


const Card = ({classname, ad_image}) => {
  return (
    <div className={'card ' + classname}>
      <div className="card_content">
        <img src={ad_image} alt="НАЗВАНИЕ ТОВАРА" className='card_content-img'/>


        {
          classname === 's' ? <CardContentXS/> : ''

        }


      </div>
    </div>
  );
};

export default Card;