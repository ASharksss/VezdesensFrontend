import React from 'react';
import {numberWithSpaces} from "../../../utils";

const CardContentS = ({title, address, date, price}) => {
  return (
    <div>
      <div className="card_content-text">
        {title !== '' ? <h1 className='card_content-title'>{title}</h1> : null}
        {address !== '' ? <p className='card_content-address'>{address}</p> : null}
        {date !== '' ? <p className='card_content-date'>{date}</p> : null}
        {price !== '' ? <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p> : null}
      </div>
    </div>
  );
};

export default CardContentS;