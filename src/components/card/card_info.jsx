import React from 'react';
import './card.css'
import Favorite from "../../ui/buttons/favorite";
import Button from "../../ui/buttons/button";
import message from "../../asserts/icons/message.svg"
import Rating from "../../ui/rating/rating";
import {NavLink} from "react-router-dom";
import {formatDate, numberWithSpaces} from "../../utils";

const CardInfo = ({userId, price, sellerName, sellerCreated, address, setActiveModal, setTypeModal, id, favorite, rating}) => {
	return (
		<div className='card_info'>
			<div className="flex items-center space-between">
				<p className='card_info-price'>{numberWithSpaces(price)} ₽</p>
				<Favorite classname={'in_card'} id={id} favorite={favorite}/>
			</div>
			<div className="flex card_info-btn">
				<div onClick={() => {
					setActiveModal(true)
					setTypeModal('phone')
				}}>
					<Button classname={'show_phone'} children={'Показать телефон'}/>
				</div>
				<Button classname={'message'} icon={message}/>
			</div>
			<div>
				<div className='seller_info'>
					<NavLink to={`/profile/${userId}`}>
						<h2 className='seller_info-name'>{sellerName}</h2>
					</NavLink>
					<p className='seller_info-date'>{formatDate(sellerCreated)}</p>
				</div>
				<div className="flex rating_info" onClick={() => {
					setActiveModal(true)
					setTypeModal('rating')
				}}>
					<Rating data={rating} type='user'/>
				</div>
				<div className="address">
					<h2 className='address_title'>Адрес</h2>
					<p className='address_text'>{address}</p>
				</div>

			</div>
		</div>
	);
};

export default CardInfo;