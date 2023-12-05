import React, {useEffect, useState} from 'react';

const SelectInput = ({data, setSelectValue, id}) => { // data: [{id: int, name: str}]
													  // setCheckboxValue: [] родительский стейт
													  // id: int родительский id, чтобы понимать для кого изменения
	const [value, setValue] = useState('')
	useEffect(() => {
		if (value !== '') {
			setSelectValue((prevState) => {
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: parseInt(value)};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: parseInt(value)}];
				}
			})
		}
	}, [id, value]);
	return (
		<div>
			<h1 className='enter_input-title'>{data.name}</h1>
			<select className='select_input' onChange={event => setValue(event.target.value)}>
				<option hidden>Выберите значение</option>
				{data['characteristicValues'].map((item, index) => (
					<option key={'characteristicValues' + index} value={item.id}>{item.name}</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;