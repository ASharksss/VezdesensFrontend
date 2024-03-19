import React from 'react';
import {NavLink} from "react-router-dom";
import {formatDateToRelative, numberWithSpaces, relativeDate, STATIC_HOST} from '../../../../utils'

const MessageItem = ({data, seller, status, image}) => {

  return (
    <div className='flex items-center message_item'>
      <img src={`${STATIC_HOST}/${image}`} width={116} className='message_item-img' alt="Название товара"
           style={{borderRadius: 15}}/>
      <div className="message_info">
        <NavLink to={`/card/${data.id}`}>
          <h1 className="message_info-title bold">{data.title}</h1>
        </NavLink>
        <NavLink to={`/profile/${seller.id}`}><p className='message_info-text'><span
          className='mr-10'>{seller.name}</span>•<span className='ml-10'>{numberWithSpaces(data.price)} ₽</span></p>
        </NavLink>
        {status === 'Истекло' ? (
        <p className='ad_status semi_bold message_item-expiration'>{status}</p>
        ) : (
        <p className='ad_status semi_bold message_item-active'>{status}</p>
        )}
      </div>
      <div className={'flex column'} style={{marginLeft: 'auto', marginRight: 15}}>
        <p className='message_info-date' title={formatDateToRelative(new Date(data.lastMessage))}>
          {data.lastMessage !== null ? relativeDate(new Date(data.lastMessage)) : null}
        </p>
        {data.unreadCount !== '0' ?
          <span style={{
            backgroundColor: 'red',
            color: 'white',
            padding: 5,
            borderRadius: '50%',
            width: 32,
            textAlign: 'center'
          }}>{data.unreadCount}</span> : null}
      </div>
    </div>
  );
};

export default MessageItem;
