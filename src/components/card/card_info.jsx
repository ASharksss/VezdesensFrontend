import React from 'react';
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import {v4 as uuidV4} from 'uuid';
import './card.css'
import Favorite from "../../ui/buttons/favorite";
import Button from "../../ui/buttons/button";
import message from "../../asserts/icons/message.svg"
import Rating from "../../ui/rating/rating";
import {numberWithSpaces} from "../../utils";
import isCompanySVG from '../../asserts/is_company.svg';

const CardInfo = ({userId, price, sellerName, sellerCreated, address, setActiveModal, setTypeModal, id, favorite, rating, show, companyName, isCompany, phone}) => {
	const {isAuth, user} = useSelector(state => state.user)
	return (
		<div className='card_info'>
			<div className="flex items-center space-between">
				<p className='card_info-price'>{numberWithSpaces(price)} ₽</p>
				{isAuth ? userId !== user.items.id ? <Favorite id={id} favorite={favorite}/> : null : null}
			</div>
			<div className="flex card_info-btn">
				{(show !== 2 && phone !== undefined)? <div onClick={() => {
					setActiveModal(true)
					setTypeModal('phone')
				}}>
					<Button classname={'show_phone'} children={'Показать телефон'}/>
				</div> : null}
				{isAuth && (userId !== user.items.id && show !== 1) ?
					<NavLink to={`/profile/${user.items.id}?adId=${id}&senderId=${user.items.id === userId ? userId : user.items.id}&receiverId=${user.items.id !== userId && userId}#chat-${uuidV4()}`}>
						<Button classname={'message'} icon={message}/>
					</NavLink> : null}
			</div>
			<div>
				<div className='seller_info'>
					<NavLink to={`/profile/${userId}`} className='seller_info_link'>
						<h2 className='seller_info-name'>{isCompany ? companyName : sellerName}</h2>
						{isCompany ? <img src={isCompanySVG} width={15} height={15} alt={companyName} style={{marginLeft: 5}}/> : null}
					</NavLink>
					<p className='seller_info-date'>На сервисе с {formatDateToRegistration(new Date(sellerCreated))}</p>
				</div>
				<div className="flex rating_info" onClick={() => {
					setActiveModal(true)
					setTypeModal('rating')
				}}>
					<Rating data={rating} />
				</div>
				<div className="address">
					<h2 className='address_title'>Адрес</h2>
					<p className='address_text'>{address.includes('@') > 0 ? address.split('@')[0] : address}</p>
				</div>

			</div>
		</div>
	);
};

function formatDateToRegistration(date) {
	const monthsArray = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
	return `${monthsArray[date.getMonth()]} ${date.getFullYear()}`
}

export default CardInfo;
