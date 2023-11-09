import React from 'react';
import './card.css'
import Favorite from "../../ui/buttons/favorite";
import Button from "../../ui/buttons/button";
import message from "../../asserts/icons/message.svg"
import Rating from "../../ui/rating/rating";
import {NavLink} from "react-router-dom";

const CardInfo = ({price, sellerName, sellerCreated, address}) => {
  return (
    <div className='card_info'>
      <div className="flex items-center space-between">
        <p className='card_info-price'>{price}</p>
        <Favorite/>
      </div>
      <div className="flex card_info-btn">
        <Button classname={'show_phone'} children={'Показать телефон'}/>
        <Button classname={'message'} icon={message}/>
      </div>
      <div>
        <div className='seller_info'>
          <NavLink to={'/myProfile'}>
            <h2 className='seller_info-name'>{sellerName}</h2>
          </NavLink>
          <p className='seller_info-date'>{sellerCreated}</p>
        </div>
        <div className="flex rating_info">
          <Rating/>
        </div>
        <div className="address">
          <h2 className='address_title'>Адрес</h2>
          <p className='address_text'>{address}</p>
        </div>

      </div>
    </div>
  );
};

export default CardInfo;