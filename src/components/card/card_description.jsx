import React from 'react';
import Button from "../../ui/buttons/button";
import {formatDate} from "../../utils";

const CardDescription = ({card_number, card_time, card_views, desription, setActiveModal, setTypeModal}) => {
    return (
        <div className='card_description'>

            <h1 className='card_description-title'>Описание</h1>
            <p className='card_description-text'>
              {desription}
            </p>
            <div className="flex jy-end" onClick={() => {
              setActiveModal(true)
              setTypeModal('description')
            }}>
            <Button classname={'stroke'} children={'Показать еще'}/>

            </div>

        </div>
    );
};

export default CardDescription;