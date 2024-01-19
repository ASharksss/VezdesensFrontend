import React from 'react';
import Button from "../../ui/buttons/button";
import './card.css'
import {formatDate} from "../../utils";

const CardDescription = ({card_number, card_time, card_views, desription, setActiveModal, setTypeModal}) => {
    return (
        <div className='card_description'>

            <h1 className='card_description-title'>Описание</h1>
            <p className='card_description-text'>
              <pre className='card_description-pre'>{desription}</pre>
            </p>


        </div>
    );
};

export default CardDescription;