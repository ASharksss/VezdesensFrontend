import React from 'react';
import './modal.css'
import { useSelector } from 'react-redux';

const PhoneModal = ({phone}) => {
	const {isAuth} = useSelector(state => state.user)
	return (
		<div className='phone_modal'>
			{isAuth ? <h1 className='description_modal-title'>{phone}</h1> : 
			<h1 style={{fontSize: '20px'}}>Войдите, чтобы увидеть номер телефона</h1>}
		</div>
	);
};

export default PhoneModal;