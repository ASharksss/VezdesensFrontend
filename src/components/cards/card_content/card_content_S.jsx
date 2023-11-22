import React from 'react';
import {numberWithSpaces} from "../../../utils";

const CardContentS = ({title, address, date, price}) => {
  return (
    <div>
      <div className="card_content-text">
        <h1 className='card_content-title'>{title}</h1>
        <p className='card_content-address'>{address}</p>
        <p className='card_content-date'>{date}</p>
        <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p>
      </div>
    </div>
  );
};

export default CardContentS;