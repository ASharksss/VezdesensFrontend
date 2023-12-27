import React from 'react';
import {NavLink} from "react-router-dom";
import Checkbox from "../../../../ui/checkbox";
import img from '../../../../asserts/messages/messageImg.png'
import {formatDateToRelative, numberWithSpaces, relativeDate, STATIC_HOST} from '../../../../utils'

const MessageItem = ({data, seller, status, image}) => {
  return (
    <div className='flex items-center message_item'>
      <div className="message_item-checkbox">
        <Checkbox/>
      </div>
      <img src={image ? `${STATIC_HOST}/${image}` : img} width={116} style={{borderRadius: 10}} alt="Название товара"/>
      <div className="message_info">
				<h1 className="message_info-title bold"><NavLink to={`/card/${data.id}`}>{data.title}</NavLink></h1>
        <p className='message_info-text'><NavLink to={`/profile/${seller.id}`}>{seller.name}</NavLink> • {numberWithSpaces(data.price)} ₽</p>
        <p className='ad_status semi_bold message_item-active'>{status}</p>
      </div>
      <p className='message_info-date' title={formatDateToRelative(new Date(data.lastMessage))}>{relativeDate(new Date(data.lastMessage))}</p>
    </div>
  );
};

export default MessageItem;