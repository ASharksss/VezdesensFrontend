import React from 'react';
import './modal.css'

const DescriptionModal = ({description}) => {
	return (
		<div className='description_modal'>
			<h1 className='description_modal-title'>Описание</h1>
			<p className='description_modal-text'>
				{description}
			</p>
		</div>
	);
};

export default DescriptionModal;