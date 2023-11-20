import React from 'react';
import './modal.css'

const PhoneModal = ({phone}) => {
	return (
		<div className='phone_modal'>
			<h1 className='description_modal-title'>{phone}</h1>
		</div>
	);
};

export default PhoneModal;