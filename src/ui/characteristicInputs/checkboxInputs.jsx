import React, {useEffect, useState} from 'react';

const CheckboxInput = ({data, setCheckboxValue, id}) => {
	const [value, setValue] = useState([])
	const handleChangeCheckbox = (event) => {
		const element = parseInt(event.target.id)
		setValue((prevState) => {
			const existingEntryIndex = prevState.findIndex((entry) => entry === element);
			if (existingEntryIndex !== -1) {
				return prevState.filter((entry) => entry !== element);
			} else {
				return [...prevState, element];
			}
		});
	};
	useEffect(() => {
		if (value.length > 0) {
			setCheckboxValue((prevState) => {
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: value};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: value}];
				}
			})
		}
	}, [id, value]);
	return (
		<div>
			<h1 className='enter_input-title'>{data.name}</h1>
			<div className='flex column mb-40'>
				{data['characteristicValues'].map((item, index) => (
					<div className='checkbox-item' key={'characteristicValuesCheckbox' + index}>
						<input onChange={handleChangeCheckbox} id={item.id} checked={value.includes(item.id)} type="checkbox" className='checkbox_input-checkbox'/>
						<label className='checkbox_input-label'>{item.name}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckboxInput;