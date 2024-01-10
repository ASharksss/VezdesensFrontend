import React from 'react';
import {NavLink} from "react-router-dom";
import Checkbox from "../../../../ui/checkbox";
import img from '../../../../asserts/messages/messageImg.png'
import {formatDateToRelative, numberWithSpaces, relativeDate, STATIC_HOST} from '../../../../utils'

const MessageItem = ({data, seller, status, image}) => {
  return (
    <div className='flex items-center message_item'>
    {/*  <div className="message_item-checkbox">
        <Checkbox/>
      </div>*/}
      <img src={image ? `${STATIC_HOST}/${image}` : img} width={116} className='message_item-img' alt="Название товара"/>
      <div className="message_info">
        <NavLink to={`/card/${data.id}`}>
          <h1 className="message_info-title bold">{data.title}</h1>
        </NavLink>
        <NavLink to={`/profile/${seller.id}`}><p className='message_info-text'><span className='mr-10'>{seller.name}</span>•<span className='ml-10'>{numberWithSpaces(data.price)} ₽</span> </p></NavLink>
        <p className='ad_status semi_bold message_item-active'>{status}</p>
      </div>
			<div className={'flex column'} style={{marginLeft: 'auto', marginRight: 15}}>
				<p className='message_info-date' title={formatDateToRelative(new Date(data.lastMessage))}>{relativeDate(new Date(data.lastMessage))}</p>
				{data.unreadCount !== 0 ?
				<span style={{backgroundColor:'red', color: 'white', padding: 5, borderRadius: '50%', width: 32, textAlign: 'center'}}>{data.unreadCount}</span> : null}
			</div>
    </div>
  );
};

export default MessageItem;