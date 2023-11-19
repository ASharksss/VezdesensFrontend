import React from 'react';

const CheckboxInput = ({data}) => {
	return (
		<div>
			<h1 className='enter_input-title'>{data.name}</h1>
			<div className='flex column mb-40'>
				{data['characteristicValues'].map((item, index) => (
					<div className='checkbox-item' key={'characteristicValuesCheckbox' + index}>
						<input type="checkbox" className='checkbox_input-checkbox'/>
						<label htmlFor="" className='checkbox_input-label'>{item.name}</label>
					</div>
				))}
			</div>

		</div>
	);
};

export default CheckboxInput;