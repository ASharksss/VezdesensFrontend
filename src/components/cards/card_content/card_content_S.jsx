import React from 'react';
import {numberWithSpaces} from "../../../utils";
import Button from "../../../ui/buttons/button";
import phone_icon from "../../../asserts/icons/phone.svg";
import message_icon from "../../../asserts/icons/message.svg";

const CardContentS = ({title, address, date, price, showPhone = 0}) => {
  return (
    <div>
      <div className="card_content-text">
        {title !== '' ? <h1 className='card_content-title'>{title}</h1> : null}
        {address !== '' ? <p className='card_content-address'>{address}</p> : null}
        {date !== '' ? <p className='card_content-date'>{date}</p> : null}
          <div className="flex jy-space-between">
              {price !== '' ? <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p> : null}
              <div className="flex">
                  {showPhone !== 2 ? <Button iconHeight={15} iconWidth={15} classname={'phone_l'} icon={phone_icon}/> : null}
                  {showPhone !== 1 ? <Button iconHeight={15} iconWidth={15} classname={'message_l'} icon={message_icon}/> : null}
              </div>
          </div>
      </div>
    </div>
  );
};

export default CardContentS;
