import React from 'react';
import './cards.css'
import imgService from '../../asserts/imgService.png'
import Button from "../../ui/buttons/button";
import phone_icon from "../../asserts/icons/phone.svg";
import message_icon from "../../asserts/icons/message.svg";

const CardService = () => {
	return (
		<div className='card_service'>
			<img src={imgService} alt="" className='card_service-img'/>
			<div className="card_service-info">
				<h1 className='card_service-title'>Водитель на автобетоносмеситель</h1>
				<p className='card_service-wage'>от 50000 р</p>
				<p className='card_service-description'>
					Полный день · Выплаты дважды в месяц · Опыт более 1 года
					Обязанности: Знание техники. Требования: Порядочность. Условия:
					О компании: ООО«Бетон Арт». Полный день · Выплаты дважды в месяц · Опыт более 1 года
					Обязанности: Знание техни
				</p>
			</div>
			<div className="card_service-btns">
				<Button classname={'phone'} icon={phone_icon}/>
				<Button classname={'message'} icon={message_icon}/>
			</div>

		</div>
	);
};

export default CardService;