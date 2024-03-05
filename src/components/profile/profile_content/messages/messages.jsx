import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import './messages.css'
import MessageItem from "./messageItem";
import arrow_icon from '../../../../asserts/icons/arrow_down.svg'
import SelectCheckBox from '../messages/SelectCheckBox'
import SelectedMessages from './selectedMessages';
import NothingYeat from '../../../nothingYeat/nothingYeat';
import PreloaderComponent from "../../../Preloader/PreloaderComponent";

const Messages = () => {
	const {items} = useSelector(state => state.user.user)
	const [data, setData] = useState([])
	const [loadingPage, setLoadingPage] = useState(false)
	const [loading, setLoading] = useState(false)
	const [choice, setChoice] = useState('old')
	const [choiceAnother, setChoiceAnother] = useState('old')
	const [choiceTitle, setChoiceTitle] = useState('Сначала старые')
	const [choiceTitleAnother, setChoiceTitleAnother] = useState('Сначала старые')
	const [open, setOpen] = useState(false)
	const [openanother, setOpenAnother] = useState(false)
	const [check, setCheck] = useState(false)

	const rootEl = useRef(null);



	const [isChecked, setIsChecked] = useState(false);
	const handleCheckBoxChange = () => {
			setIsChecked(!isChecked);
	};
	useEffect(() => {
		if (check) {
		}
		setCheck(false)
	}, [check])

	const handleGetMessages = async () => {
		setLoadingPage(true)
		await axios('api/chat/getMessages')
			.then(res => {
				setData(res.data)
				setLoadingPage(false)
			}).catch(err => {
				console.log(err)
				window.alert(err.response.data.message)
				setLoadingPage(false)
			})
	}

	useEffect(() => {
		handleGetMessages()
	}, [])

	useEffect(() => {
		const onClick = e => rootEl.current.contains(e.target) || setOpen(false) || setOpenAnother(false) ;
  		document.addEventListener('click', onClick);
  		return () => document.removeEventListener('click', onClick);
	}, [])

	useEffect(() => {
		if (choice === 'new') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
		} else if (choice === 'old') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
		} else if (choice === 'views_down') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(a.views) - new Date(b.views)))
		} else if (choice === 'views_up') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(b.views) - new Date(a.views)))
		}
	}, [choice])

	if (loadingPage) {
		return <PreloaderComponent />
	}
	
	return (
		<div>
			<div className="messages_header flex" ref={rootEl}>
				<SelectCheckBox/>
				{/* открываются вместе потомочту одинаковые данные приходят, и одниаковые реакциии OnClick  */}
				<div className="filter" >
							<div className="ads_filter_select mr-r" >
								<div className="flex items-center space-between ads_filter-header" onClick={() => setOpenAnother(!openanother)}>
									{choiceTitleAnother}
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ openanother ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
									<div className='filter_select-item' onClick={() => {
										setChoiceAnother('old')
										setChoiceTitleAnother('Сначала старые')
										setOpenAnother(!openanother)
									}}>Сначала старые</div>
									<div className='filter_select-item' onClick={() => {
										setChoiceAnother('new')
										setChoiceTitleAnother('Сначала новые')
										setOpenAnother(!openanother)
									}}>Сначала новые</div>
									<div className='filter_select-item' onClick={() => {
										setChoiceAnother('views_down')
										setChoiceTitleAnother('По просмотрам ↑')
										setOpenAnother(!openanother)
									}}>По просмотрам ↑</div>
									<div className='filter_select-item' onClick={() => {
										setChoiceAnother('views_up')
										setChoiceTitleAnother('По просмотрам ↓')
										setOpenAnother(!openanother)
									}}>По просмотрам ↓</div>
								</div>
							</div>
				</div>
				<div className="filter" >
							<div className="ads_filter_select" >
								<div className="flex items-center space-between ads_filter-header" onClick={() => setOpen(!open)}>
									{choiceTitle}
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ open ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
									<div className='filter_select-item' onClick={() => {
										setChoice('old')
										setChoiceTitle('Сначала старые')
										setOpen(!open)
									}}>Сначала старые</div>
									<div className='filter_select-item' onClick={() => {
										setChoice('new')
										setChoiceTitle('Сначала новые')
										setOpen(!open)
									}}>Сначала новые</div>
									<div className='filter_select-item' onClick={() => {
										setChoice('views_down')
										setChoiceTitle('По просмотрам ↑')
										setOpen(!open)
									}}>По просмотрам ↑</div>
									<div className='filter_select-item' onClick={() => {
										setChoice('views_up')
										setChoiceTitle('По просмотрам ↓')
										setOpen(!open)
									}}>По просмотрам ↓</div>
								</div>
							</div>
				</div>
			</div>

			<div className="messages_list">
				{data.length > 0 ? data.map((item, index) => (
					<SelectCheckBox
					setIsChecked={setIsChecked}
					onChange={handleCheckBoxChange}>
					<NavLink state={{from: item[0].user}} to={`?adId=${item[0].id}&senderId=${items.id === item[1].id ? item[1].id : item[0].user.id}&receiverId=${items.id !== item[0].user.id ? item[0].user.id : item[1].id}#chat-${uuidV4()}`}>
						<MessageItem data={item[0]} seller={item[0].user}
												 status={item[0].statusAd.name} image={item[0].previewImageAds[0]?.name}/>
					</NavLink>
					</SelectCheckBox>
				)) : <NothingYeat message={"Пока нет сообщений"}/>}

			{
				isChecked ? (
					<>
					<SelectedMessages/>
					</>
				) : (
					<>
					</>
				)
			}
			</div>
		</div>
	);
};

export default Messages;
