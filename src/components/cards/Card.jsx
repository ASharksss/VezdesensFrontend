import React from 'react';
import {NavLink} from 'react-router-dom'
import './cards.css'
import CardContentXS from "./card_content/card_content_XS";
import CardContentS from "./card_content/card_content_S";
import CardContentL from "./card_content/card_content_L";
import CardContentXL from "./card_content/card_content_XL";
import CardContentXXl from "./card_content/card_content_XXL";
import Favorite from "../../ui/buttons/favorite";



const Card = ({classname, ad_image}) => {
  return (
    <div className={'card ' + classname}>
      <NavLink to={'/card'} className='black'>
        <div className="card_content">
          <Favorite classname={'in_card'}/>
          <img src={ad_image} alt="НАЗВАНИЕ ТОВАРА" className='card_content-img'/>
          {
            classname === 'xs' ? <CardContentXS/> :
              classname === 's' ? <CardContentS/> :
                classname === 'l' ? <CardContentL/> :
                  classname === 'xl' ? <CardContentXL/> :
                    classname === 'xxl' ? <CardContentXXl/> :
                      ''
          }
        </div>
      </NavLink>
    </div>
  );
};

export default Card;