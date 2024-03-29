import React from 'react';
import {numberWithSpaces} from "../../../utils";
import {NavLink} from "react-router-dom";

const CardContentXS = ({title, address, date, price, id}) => {
  return (
    <div>
      <NavLink to={`/card/${id}`}>
        <div className="card_content-text">
          <h1 className='card_content-title'>{title}</h1>
          {!address ? (
            <p className='card_content-address'>&nbsp;</p>
          ) : (
            <p className='card_content-address'>{address}</p>
          )}
          <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p>
        </div>
      </NavLink>

    </div>
  );
};

export default CardContentXS;
