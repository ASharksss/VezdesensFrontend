import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import EnterInput from "../ui/characteristicInputs/enterInput";
import SelectInput from "../ui/characteristicInputs/selectInput";
import CheckboxInput from "../ui/characteristicInputs/checkboxInputs";

const CardEditPage = () => {
	const [cardData, setCardData] = useState([])
	const [exception, setException] = useState(false)
	const [loading, setLoading] = useState(false)
	const [characteristicData, setCharacteristicData] = useState([])
	const [adCharacteristic, setAdCharacteristic] = useState([])
	const [enterValue, setEnterValue] = useState([])
	const [selectValue, setSelectValue] = useState([])
	const {id} = useParams()
	const handleGetInfo = async () => {
		setLoading(true)
		await axios.get(`api/ad/getEditAd/${id}`)
			.then(res => {
				setCardData(res.data)
				setCharacteristicData(res.data.object.characteristicObjects)
				setAdCharacteristic([res.data.adCharacteristicInputs, res.data.adCharacteristicSelects])
				return res.data
			})
			.catch(err => {
				setException(true)
				setLoading(false)
			})
	}

	useEffect(() => {
		if (adCharacteristic.length > 0) {
			const timeArray = characteristicData
			const groupByCharacteristicId = adCharacteristic[1].reduce((acc, {characteristic, characteristicValue}) => {
				const id = characteristic.id;
				const valueId = characteristicValue.id;
				if (!acc[id]) {
					acc[id] = [];
				}
				acc[id].push(valueId);
				return acc;
			}, {});
			timeArray.map((state) => {
				adCharacteristic[0].map(item => {
					if (item.characteristic.id === state.characteristicId) {
						state['value'] = item.value
					}
				})
				Object.keys(groupByCharacteristicId).forEach(function (key, value) {
					if (parseInt(key) === state.characteristicId) {
						if (state.characteristic.typeCharacteristic.name === 'select')
							state['value'] = groupByCharacteristicId[key][0]
						else
							state['value'] = groupByCharacteristicId[key]
					}
				});
			})
			setCharacteristicData(timeArray)
			setLoading(false)
		}
	}, [adCharacteristic])

	useEffect(() => {
		document.title = `Редактирование`
		handleGetInfo()
	}, [])

	if (loading) {
		return (
			<div className={'container'}>
				<p>Загрузка данных...</p>
			</div>
		)
	}

	if (exception) {
		return (
			<div className={'container'}>
				<p>Нет доступа к редактированию карточки</p>
			</div>
		)
	}

	return (
		<div className={'container'}>
			<div className="flex row">
				<div className="flex column mr-50">
					<h1 className='character-title'>Основные характеристики</h1>
					{characteristicData.length > 0 &&
						characteristicData.map((item, index) => (item['characteristic']['required'] ?
								<>
									{item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
										<EnterInput setEnterValue={setEnterValue} key={'enter' + index} data={item['characteristic']}
																id={item['characteristicId']} isRequired={true} mainValue={item['value']}/>}
									{item['characteristic']['typeCharacteristic']['name'] === 'select' &&
										<SelectInput setSelectValue={setSelectValue} key={'select' + index} isRequired={true}
																 data={item['characteristic']} id={item['characteristicId']}
																 mainValue={item['value']}/>}
									{item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
										<CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index} isRequired={true}
																	 data={item['characteristic']} id={item['characteristicId']}
																	 mainValue={item['value']}/>}
								</> : null
						))
					}
				</div>

				<div className="flex column">
					<h1 className='character-title'>Дополнительные характеристики</h1>
					{characteristicData.length > 0 &&
						characteristicData.map((item, index) => (!item['characteristic']['required'] ?
								<>
									{item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
										<EnterInput setEnterValue={setEnterValue} key={'enter' + index} data={item['characteristic']}
																id={item['characteristicId']} isRequired={true} mainValue={item['value']}/>}
									{item['characteristic']['typeCharacteristic']['name'] === 'select' &&
										<SelectInput setSelectValue={setSelectValue} key={'select' + index} isRequired={true}
																 data={item['characteristic']} id={item['characteristicId']}
																 mainValue={item['value']}/>}
									{item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
										<CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index} isRequired={true}
																	 data={item['characteristic']} id={item['characteristicId']}
																	 mainValue={item['value']}/>}
								</> : null
						))
					}
				</div>
			</div>

		</div>
	);
};

export default CardEditPage;