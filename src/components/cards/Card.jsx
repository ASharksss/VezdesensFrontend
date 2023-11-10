import React from 'react';
import {NavLink} from 'react-router-dom'
import './cards.css'
import CardContentXS from "./card_content/card_content_XS";
import CardContentS from "./card_content/card_content_S";
import CardContentL from "./card_content/card_content_L";
import CardContentXL from "./card_content/card_content_XL";
import CardContentXXl from "./card_content/card_content_XXL";
import Favorite from "../../ui/buttons/favorite";


const Card = ({classname, ad_image, title, address, date, price, id}) => {
  return (
    <div className={'card ' + classname}>
      <div className="card_content">
        <Favorite classname={'in_card'} id={id}/>
        <NavLink to={`/card/${id}`} className='black'>
          <img src={ad_image} alt="НАЗВАНИЕ ТОВАРА" className='card_content-img'/>
          {
            classname === 'xs' ? <CardContentXS title={title} address={address} price={price} date={date}/> :
              classname === 's' ? <CardContentS title={title} address={address} price={price} date={date}/> :
                classname === 'l' ? <CardContentL title={title} address={address} price={price} date={date}/> :
                  classname === 'xl' ? <CardContentXL title={title} address={address} price={price} date={date}/> :
                    classname === 'xxl' ? <CardContentXXl title={title} address={address} price={price} date={date}/> :
                      ''
          }
        </NavLink>
      </div>
    </div>
  );
};

export default Card;