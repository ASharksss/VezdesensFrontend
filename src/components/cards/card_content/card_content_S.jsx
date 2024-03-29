import React, {useState} from 'react';
import {numberWithSpaces} from "../../../utils";
import Button from "../../../ui/buttons/button";
import phone_icon from "../../../asserts/icons/phone.svg";
import message_icon from "../../../asserts/icons/message.svg";
import {NavLink} from "react-router-dom";
import PhoneModal from "../../modal/phoneModal";
import ModalMain from "../../modal/modalMain";
import {v4 as uuidV4} from "uuid";
import message from "../../../asserts/icons/message.svg";
import {useSelector} from "react-redux";

const CardContentS = ({title, address, date, price, showPhone = 0, id, userData}) => {

  const {isAuth, user} = useSelector(state => state.user)

  const [activeModal, setActiveModal] = useState(false)

  console.log(user)
  return (
    <div>
      <div className="card_content-text">
        <NavLink to={`/card/${id}`}>
          {title !== '' ? <h1 className='card_content-title'>{title}</h1> : null}
          {address !== '' ? <p className='card_content-address'>{address}</p> : null}
          {date !== '' ? <p className='card_content-date'>{date}</p> : null}
        </NavLink>
        <div className="flex jy-space-between">
          <NavLink to={`/card/${id}`}>
            {price !== '' ? <p className='card_content-price'>{numberWithSpaces(parseInt(price))} ₽</p> : null}
          </NavLink>
          <div className="flex">
            {showPhone !== 2 ? <Button iconHeight={15} iconWidth={15} classname={'phone_l'} icon={phone_icon}
                                       handleClick={() => setActiveModal(true)}/> : null}
            {
              isAuth && (userData.id !== user.items.id && showPhone !== 1) ?
                <NavLink
                  to={`/profile/${user.items.id}?adId=${id}&senderId=${user.items.id === userData.id ? userData.id
                    : user.items.id}&receiverId=${user.items.id !== userData.id && userData.id}#chat-${uuidV4()}`}>
                  <Button iconHeight={15} iconWidth={15} classname={'message_l'} icon={message_icon}/>
                </NavLink>
                : null
            }
          </div>
        </div>
      </div>
      <ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
                 children={<PhoneModal phone={userData.phone}/>}/>

    </div>
  );
};

export default CardContentS;
