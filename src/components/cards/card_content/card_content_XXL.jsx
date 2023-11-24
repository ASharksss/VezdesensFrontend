import React from 'react';
import Button from "../../../ui/buttons/button";
import phone_icon from "../../../asserts/icons/phone.svg";
import message_icon from "../../../asserts/icons/message.svg";
import {numberWithSpaces} from "../../../utils";

const CardContentXXl = ({title, address, date, price}) => {
  return (

  <div className='flex items-center space-between'>
    <div className="card_content-text">
      <div>
        <h1 className='card_content-title'>{title}</h1>
        <div className="flex">
          <p className='card_content-address'>{address}</p>
          <p className='card_content-date'>{date}</p>
        </div>
      </div>
    </div>
    <div className="flex items-center">
      <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p>
      <Button classname={'phone'} icon={phone_icon}/>
      <Button classname={'message'} icon={message_icon}/>
    </div>
  </div>
  );
};

export default CardContentXXl;