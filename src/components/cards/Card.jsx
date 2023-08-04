import React from 'react';
import './cards.css'
import CardContentXS from "./card_content/card_content_XS";
import CardContentS from "./card_content/card_content_S";
import CardContentL from "./card_content/card_content_L";



const Card = ({classname, ad_image}) => {
  return (
    <div className={'card ' + classname}>
      <div className="card_content">
        <img src={ad_image} alt="НАЗВАНИЕ ТОВАРА" className='card_content-img'/>


        {
          classname === 'xs' ? <CardContentXS/> :
            classname === 's' ? <CardContentS/> :
              classname === 'l' ? <CardContentL/> :
              ''

        }


      </div>
    </div>
  );
};

export default Card;