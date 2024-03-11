import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import './messages.css'
import MessageItem from "./messageItem";
import arrow_icon from '../../../../asserts/icons/arrow_down.svg'
import SelectCheckBox from '../messages/SelectCheckBox'
import SelectedMessages from './selectedMessages';
import NothingYeat from '../../../nothingYeat/nothingYeat';
import PreloaderComponent from "../../../Preloader/PreloaderComponent";
import useGetMessages from "../../../../redux/hooks/useGetMessages";

const Messages = () => {
	const {items} = useSelector(state => state.user.user)
	const [choice, setChoice] = useState('old')
	const [choiceAnother, setChoiceAnother] = useState('old')
	const [choiceTitle, setChoiceTitle] = useState('Сначала старые')
	const [choiceTitleAnother, setChoiceTitleAnother] = useState('Сначала старые')
	const [open, setOpen] = useState(false)
	const [openanother, setOpenAnother] = useState(false)
	const [check, setCheck] = useState(false)
	const [checked, setChecked] = useState([])

	const rootEl = useRef(null);

	const {data, setData, loading} = useGetMessages()
	const handleCheckBoxChange = (chatId) => {
		setChecked(prevState => {
			// Проверяем, был ли chatId уже включен
			const isChecked = prevState.includes(chatId);

			if (isChecked) {
				// Если chatId уже включен, исключаем его из состояния
				return prevState.filter(id => id !== chatId);
			} else {
				// Иначе добавляем его к предыдущему состоянию
				return [...prevState, chatId];
			}
		});
	};

	const handleAllChecked = () => {
		if (checked.length === data.length) {
			setChecked([])
		} else {
			setChecked([])
			data.map(item => setChecked(prevState => [...prevState, item[0].chat]))
		}
	}
	useEffect(() => {
		if (check) {
		}
		setCheck(false)
	}, [check])

	useEffect(() => {
		const onClick = e => rootEl.current.contains(e.target) || setOpen(false) || setOpenAnother(false);
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, [])

	useEffect(() => {
		if (choice === 'new') {
			setData(data.sort((a, b) => new Date(b[0].createdAt) - new Date(a[0].createdAt)))
		} else if (choice === 'old') {
			setData(data.sort((a, b) => new Date(a[0].createdAt) - new Date(b[0].createdAt)))
		}
	}, [choice])

	if (loading) {
		return <PreloaderComponent/>
	}
	return (
		<div>
			<div className="messages_header flex" ref={rootEl}>
				<label className='chbx_label'>
					<input
						checked={checked.length === data.length}
						className="chbx_for_message"
						style={{background: "black"}}
						type="checkbox"
						onChange={() => handleAllChecked()}
					/>
					<span className="chbx_marker"></span>
				</label>
				{/* открываются вместе потомочту одинаковые данные приходят, и одниаковые реакциии OnClick  */}
				<div className="filter">
					<div className="ads_filter_select mr-r">
						<div className="flex items-center space-between ads_filter-header"
								 onClick={() => setOpenAnother(!openanother)}>
							{choiceTitleAnother}
							<img src={arrow_icon} alt=""/>
						</div>
						<div className={openanother ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
							<div className='filter_select-item' onClick={() => {
								setChoiceAnother('old')
								setChoiceTitleAnother('Сначала старые')
								setOpenAnother(!openanother)
							}}>Сначала старые
							</div>
							<div className='filter_select-item' onClick={() => {
								setChoiceAnother('new')
								setChoiceTitleAnother('Сначала новые')
								setOpenAnother(!openanother)
							}}>Сначала новые
							</div>
						</div>
					</div>
				</div>
				<div className="filter">
					<div className="ads_filter_select">
						<div className="flex items-center space-between ads_filter-header"
								 onClick={() => setOpen(!open)}>
							{choiceTitle}
							<img src={arrow_icon} alt=""/>
						</div>
						<div className={open ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
							<div className='filter_select-item' onClick={() => {
								setChoice('old')
								setChoiceTitle('Сначала старые')
								setOpen(!open)
							}}>Сначала старые
							</div>
							<div className='filter_select-item' onClick={() => {
								setChoice('new')
								setChoiceTitle('Сначала новые')
								setOpen(!open)
							}}>Сначала новые
							</div>
							<div className='filter_select-item' onClick={() => {
								setChoice('views_down')
								setChoiceTitle('По просмотрам ↑')
								setOpen(!open)
							}}>По просмотрам ↑
							</div>
							<div className='filter_select-item' onClick={() => {
								setChoice('views_up')
								setChoiceTitle('По просмотрам ↓')
								setOpen(!open)
							}}>По просмотрам ↓
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="messages_list">
				{data.length > 0 ? data.map((item, index) => (
					<SelectCheckBox
						setIsChecked={checked.find(value => value === item[0].chat)}
						chatId={item[0].chat}
						onChange={handleCheckBoxChange}>
						<NavLink state={{from: item[0].receiver}}
										 to={`?adId=${item[0].id}&senderId=${items.id}&receiverId=${item[1].id}#chat-${uuidV4()}`}>
							<MessageItem data={item[0]} seller={item[0].user}
													 status={item[0].statusAd.name} image={item[0].previewImageAds[0]?.name}/>
						</NavLink>
					</SelectCheckBox>
				)) : <NothingYeat message={"Пока нет сообщений"}/>}

				{checked.length > 0 ? <SelectedMessages count={checked.length}/> : null}
			</div>
		</div>
	);
};

export default Messages;
