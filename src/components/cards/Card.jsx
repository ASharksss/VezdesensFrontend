import React from 'react';
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux';
import './cards.css'
import CardContentXS from "./card_content/card_content_XS";
import CardContentS from "./card_content/card_content_S";
import CardContentL from "./card_content/card_content_L";
import CardContentXL from "./card_content/card_content_XL";
import CardContentXXl from "./card_content/card_content_XXL";
import Favorite from "../../ui/buttons/favorite";


const Card = ({classname, ad_image, title, address, date, price, id, favorite, type='also'}) => {
  const {isAuth} = useSelector(state => state.user)
  if (type === 'newAd') {
    return (
      <div className={'card ' + classname} style={{height: 'auto'}}>
        <div className="card_content">
            <img src={ad_image} className='card_content-img'/>
            <CardContentS title={title} address={address} price={price} date={date}/>
        </div>
      </div>
    );
  }
  return (
    <div className={'card ' + classname} title={title}>
      <div className="card_content">
        {isAuth ? <Favorite classname={'in_card'} id={id} favorite={favorite}/> : null}
        <NavLink to={`/card/${id}`} className='black'>
          {/*<CardCarousel images={ad_image} />*/}
          <img src={ad_image} alt={title} className='card_content-img'/>
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