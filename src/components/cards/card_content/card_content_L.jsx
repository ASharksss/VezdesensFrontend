import React from 'react';
import Button from "../../../ui/buttons/button";
import phone_icon from '../../../asserts/icons/phone.svg'
import message_icon from '../../../asserts/icons/message.svg'

const CardContentL = () => {
  return (
    <div className='flex items-center space-between'>
      <div className="card_content-text">
        <h1 className='card_content-title'>Массажер для тела</h1>
        <p className='card_content-address'>Казань, Проспект Победы</p>
        <p className='card_content-date'>Сегодня 14:52</p>
      </div>
      <div className="flex items-center">
        <p className='card_content-price'>10000Р</p>
        <Button classname={'phone'} icon={phone_icon}/>
        <Button classname={'message'} icon={message_icon}/>
      </div>
    </div>
  );
};

export default CardContentL;