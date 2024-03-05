import React, {useEffect, useState} from 'react';
import button from "../../ui/buttons/button";
import axios from "axios";
import "../modal/modal.css";
import arrow_icon from '../../asserts/icons/arrow_down.svg'
import {useNavigate, useParams} from "react-router-dom";

const AddAppeal = () => {
	const [topics, setTopics] = useState([])
	const [topic, setTopic] = useState(0)
	const [text, setText] = useState('')
	const [open, setOpen] = useState(false)


	const {id} = useParams()
	const navigate = useNavigate()

	const getTopics = async () => {
		await axios.get('api/support/getTopicAppeals')
			.then(res => setTopics(res.data))
	}

	const addAppeal = async () => {
		const data = {
			topicOfAppealId: topic,
			userId: id,
			text
		}
		await axios.post('api/support/createAppeal', data)
			.then(res => {
				navigate(`?id=${res.data.id}#appeal`)
			})
	}

	useEffect(() => {
		getTopics()
	}, [])


	return (
		<div className='column flex'>
			<h1 className='add_appeal-title'>Создание обращения</h1>
			{/* <select className='add_appeal-select'

              onChange={(e) => setTopic(e.target.value)}>
        <option disabled={true}>Выберите вариант...</option>
        {
          topics.map(item => (
            <option  value={item.id}>{item.name}</option>
          ))
        }
      </select> */}
			{/* Постарся ничиго глобально не трогать, новые классы новые значиения, схожие с предыдущим вариантом */}
			<div className="filter">
				<div className="Edited_appeal-select">
					<div className="flex items-center space-between Edited_filter-header" onClick={() => setOpen(!open)}>
						{/* Вывожу значние topic  */}
						{topic === 0 ? 'Выберите вариант...' : topics.find(item => item.id === parseInt(topic)).name}
						<img src={arrow_icon} alt=""/>
					</div>
					<div className={open ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
						{
							topics.map(item => (
								// Предаю значиение item.name после topic присваиваю значиение при клике
								<div className='Edited_filter_select-item' onClick={() => {
									setTopic(item.id)
									setOpen(!open)
								}}>{item.name}</div>
							))
						}
					</div>
				</div>
			</div>
			<textarea className='add_appeal-textarea' value={text}
								onChange={(e) => setText(e.target.value)}></textarea>
			<button className='add_appeal-btn' onClick={addAppeal}>Содать обращени</button>
		</div>

	);
};

export default AddAppeal;
