import React from 'react';
import './modal.css'

const DescriptionModal = ({adCharacteristicSelects, adCharacteristicInputs}) => { // приходят вместе с данными карты
	// adCharacteristicInputs: [{id: int, value: str, characteristic: {name: str}}]
	// adCharacteristicSelects: [{id: int, characteristic: {name: str}, characteristicValue: {name: str}}]
	return (
		<div className='description_modal'>
			<h1 className='description_modal-title'>характеристики</h1>
			<p className='description_modal-text'>
				{adCharacteristicInputs.map((item, index) => (
					<p key={`adCharacteristicInputs=${index}-${item.id}`}>{item.characteristic.name} - {item.value}</p>
				))}
				{adCharacteristicSelects.map((item, index) => (
					<p key={`adCharacteristicSelects=${index}-${item.id}`}>{item.characteristic.name} - {item.characteristicValue.name}</p>
				))}
			</p>
		</div>
	);
};

export default DescriptionModal;