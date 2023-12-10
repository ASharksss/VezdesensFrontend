import React, {useEffect, useState} from 'react';
import './characteristicInputs.css'

const EnterInput = ({data, setEnterValue, id, isRequired=false}) => { // data: [{id: int, name: str}]
													// setCheckboxValue: [] родительский стейт
													// isRequired: bool default false, обязательное поле
													// id: int родительский id, чтобы понимать для кого изменения
	const [value, setValue] = useState('')
	useEffect(() => {
		if (value !== '') {
			setEnterValue((prevState) => {
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: parseFloat(value)};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: parseFloat(value)}];
				}
			})
		}
	}, [id, value]);
	return (
		<div className='flex column'>
			<label htmlFor="" className='enter_input-title'>{data.name}</label>
			<input value={value} onChange={event => setValue(event.target.value)}
						 type="text" className='enter_input-input' required={isRequired}/>
		</div>
	);
};

export default EnterInput;