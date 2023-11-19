import React from 'react';

const SelectInput = ({data}) => {
	return (
		<div>
			<h1 className='enter_input-title'>{data.name}</h1>
			<select className='select_input'>
				<option hidden>Выберите значение</option>
				{data['characteristicValues'].map((item, index) => (
					<option key={'characteristicValues' + index} value={item.id}>{item.name}</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;