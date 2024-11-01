import React, {useEffect, useState} from 'react';
import './characteristicInputs.css'

const CheckboxInput = ({data, setCheckboxValue, id, isRequired=false, mainValue=[]}) => { // data: [{id: int, name: str}]
														  // setCheckboxValue: [] родительский стейт
														  // isRequired: bool default false, обязательное поле
														  // id: int родительский id, чтобы понимать для кого изменения
	const [value, setValue] = useState(mainValue) // для хранения временных id
	const handleChangeCheckbox = (event) => {
		const element = parseInt(event.target.dataset.id)
		setValue((prevState) => { // проверка добавленного id-элемента
			const existingEntryIndex = prevState.findIndex((entry) => entry === element);
			if (existingEntryIndex !== -1) { // проверка имеется ли она уже во временном хранилище
				return prevState.filter((entry) => entry !== element); // если да, то удаляем
			} else {
				return [...prevState, element]; // если нет, то добавляем
			}
		});
	};
	useEffect(() => {
		if (value.length > 0) {
			setCheckboxValue((prevState) => { // те же самые проверки, только запись на родительский стейт
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
		if (value.length === 0) {
			const removeById = (arr) => {
				const updatedArr = arr.filter(item => item.id !== id);
				return updatedArr;
			};
			setCheckboxValue((prevState) => removeById(prevState))
		}
	}, [id, value]); // триггеры по родительскому id и значению из временного хранилища
	return (
		<div>
			<h1 className='enter_input-title'>{data.name}</h1>
			<div className='checkbox_body mb-40'>
				<div>

				</div>
				{data['characteristicValues'].map((item, index) => (
					<div className='checkbox-item' key={'characteristicValuesCheckbox' + index}>
						<input onChange={handleChangeCheckbox} id={`checkbox-${item.name}=${item.id}`} data-id={item.id} checked={value.includes(item.id)} type="checkbox" className='checkbox_input-checkbox'/>
						<label htmlFor={`checkbox-${item.name}=${item.id}`} className='checkbox_input-label'>{item.name}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckboxInput;