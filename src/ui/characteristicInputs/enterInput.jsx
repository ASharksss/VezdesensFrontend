import React from 'react';
import './characteristicInputs.css'

const EnterInput = ({data}) => {
	return (
		<div className='flex column'>
			<label htmlFor="" className='enter_input-title'>{data.name}</label>
			<input type="text" className='enter_input-input'/>
		</div>
	);
};

export default EnterInput;