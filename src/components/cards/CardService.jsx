import React from 'react';
import {v4 as uuidV4} from "uuid";
import './cards.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "../../ui/buttons/button";
import phone_icon from "../../asserts/icons/phone.svg";
import {numberWithSpaces, STATIC_HOST} from "../../utils";
import message from "../../asserts/icons/message.svg";

const CardService = ({type, item, setPhone, setActiveModal}) => {
	const {isAuth, user} = useSelector(state => state.user)
	return (
		<div className='card_service'>
			<img src={`${STATIC_HOST}/${item.previewImageAds[0].name}`} alt={item.title} className='card_service-img'/>
			<NavLink to={`/card/${item.id}`} >
				<div className="card_service-info">
					<h1 className='card_service-title'>{item.title}</h1>
					<p className='card_service-wage'>{numberWithSpaces(parseInt(item.price))} ₽</p>
					<div className='card_service-description'>
						<pre className='service_description-pre'>{item.description}</pre>
					</div>
				</div>
			</NavLink>
			<div className="card_service-btns">
				{type === 'vacancy' ? <Button classname={'phone'} icon={phone_icon} handleClick={() => {
					setPhone(item.user.phone)
					setActiveModal(true)
				}}/> : null}
				{isAuth ? item.user.id !== user.items.id ?

					<NavLink className='ml-20'
						to={`/profile/${item.user.id}?adId=${item.id}&senderId=${user.items.id === item.user.id ? item.user.id : user.items.id}&receiverId=${user.items.id !== item.user.id && item.user.id}#chat-${uuidV4()}`}>
						<Button classname={'message'} icon={message}/>
					</NavLink> : null : null}
			</div>

		</div>);
};

export default CardService;