import React from 'react';
import './modal.css'

const DescriptionModal = ({adCharacteristicSelects, adCharacteristicInputs}) => { // приходят вместе с данными карты
	// adCharacteristicInputs: [{id: int, value: str, characteristic: {name: str}}]
	// adCharacteristicSelects: [{id: int, characteristic: {name: str}, characteristicValue: {name: str}}]
	return (
		<div className='description_modal'>
			<h1 className='description_modal-title'>Характеристики</h1>
			<p className='description_modal-text'>
				{adCharacteristicInputs.length > 0 ?adCharacteristicInputs.map((item, index) => (
					item.characteristic !== null ? <p key={`adCharacteristicInputs=${index}-${item.id}`}>{item.characteristic.name} - {item.value}</p> : null
				)) : null}
				{adCharacteristicSelects.length > 0 ? adCharacteristicSelects.map((item, index) => (
					item.characteristic !== null ? <p key={`adCharacteristicSelects=${index}-${item.id}`}>{item.characteristic?.name} - {item.characteristicValue?.name}</p> : null
				)) : null}
			</p>
		</div>
	);
};

export default DescriptionModal;