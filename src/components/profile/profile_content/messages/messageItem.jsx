import React from 'react';
import Checkbox from "../../../../ui/checkbox";
import img from '../../../../asserts/messages/messageImg.png'

const MessageItem = () => {
  return (
    <div className='flex items-center message_item'>
      <div className="message_item-checkbox">
        <Checkbox/>
      </div>
      <img src={img} alt="Название товара"/>
      <div className="message_info">
        <h1 className="message_info-title bold">iPhone 14 pro max 256gb</h1>
        <p className='message_info-text'>AppleMania • 109 990 ₽</p>
        <p className='ad_status semi_bold message_item-active'>Активно</p>
      </div>
      <p className='message_info-date'>6 нояб</p>
    </div>
  );
};

export default MessageItem;