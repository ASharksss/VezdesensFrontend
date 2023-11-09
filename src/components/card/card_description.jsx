import React from 'react';
import Button from "../../ui/buttons/button";

const CardDescription = ({card_number, card_time, card_views, desription}) => {
    return (
        <div className='card_description'>
            <p className='number_time_views'>{card_number + ' · ' + card_time + ' · ' + card_views + ' просмотров'}</p>
            <h1 className='card_description-title'>Описание</h1>
            <p className='card_description-text'>
              {desription}
            </p>
            <div className="flex jy-end">
            <Button classname={'stroke'} children={'Показать еще'}/>

            </div>

        </div>
    );
};

export default CardDescription;