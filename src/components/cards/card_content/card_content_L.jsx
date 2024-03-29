import React from 'react';
import Button from "../../../ui/buttons/button";
import phone_icon from '../../../asserts/icons/phone.svg'
import message_icon from '../../../asserts/icons/message.svg'
import {numberWithSpaces} from "../../../utils";

const CardContentL = ({title, address, date, price, showPhone = 0}) => {
  return (
    <div className='flex items-center space-between'>
      <div className="card_content-text">
        <h1 className='card_content-title'>{title}</h1>
        <p className='card_content-address'>{address}</p>
        {!date ? (
          <p className='card_content-date'>&nbsp;</p>
        ) : (
          <p className='card_content-date'>{date}</p>
        )}
      </div>
      <div className="flex items-center column">
          <div className='flex'>
              {showPhone !== 2 ? <Button classname={'phone'} icon={phone_icon}/> : null}
              {showPhone !== 1 ? <Button classname={'message'} icon={message_icon}/> : null}
          </div>
          <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p>
      </div>
    </div>
  );
};

export default CardContentL;
