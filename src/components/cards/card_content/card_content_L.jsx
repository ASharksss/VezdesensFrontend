import React, {useState} from 'react';
import Button from "../../../ui/buttons/button";
import phone_icon from '../../../asserts/icons/phone.svg'
import message_icon from '../../../asserts/icons/message.svg'
import {numberWithSpaces} from "../../../utils";
import ModalMain from "../../modal/modalMain";
import PhoneModal from "../../modal/phoneModal";
import {NavLink} from "react-router-dom";

const CardContentL = ({title, address, date, price, showPhone = 0, id, userData}) => {

  const [activeModal, setActiveModal] = useState(false)


  return (
    <div className='flex items-center space-between'>
      <NavLink to={`/card/${id}`}>
        <div className="card_content-text">
          <h1 className='card_content-title'>{title}</h1>
          <p className='card_content-address'>{address}</p>
          {!date ? (
            <p className='card_content-date'>&nbsp;</p>
          ) : (
            <p className='card_content-date'>{date}</p>
          )}
        </div>
      </NavLink>
      <div className="flex items-center column">
        <div className='flex'>
          {showPhone !== 2 ? <Button classname={'phone'} icon={phone_icon} handleClick={() => setActiveModal(true)}/> : null}
          {showPhone !== 1 ? <Button classname={'message'} icon={message_icon}/> : null}
        </div>
        <NavLink to={`/card/${id}`}>
          <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p>
        </NavLink>

      </div>
      <ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
                 children={<PhoneModal phone={userData.phone}/>}/>
    </div>
  );
};

export default CardContentL;
