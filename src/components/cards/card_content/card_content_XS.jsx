import React from 'react';

const CardContentXS = ({title, address, date, price}) => {
  return (
    <div>
      <div className="card_content-text">
        <h1 className='card_content-title'>{title}</h1>
        <p className='card_content-address'>{address}</p>
        <p className='card_content-date'>{date}</p>
        <p className='card_content-price'>{price}Р</p>
      </div>
    </div>
  );
};

export default CardContentXS;