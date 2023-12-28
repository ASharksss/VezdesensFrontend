import React, {useEffect, useMemo, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import {NavLink} from "react-router-dom";
import axios from "axios";
import './messages.css'
import Checkbox from "../../../../ui/checkbox";
import MessageItem from "./messageItem";
import SelectedMessages from "./selectedMessages";
import {relativeDate} from "../../../../utils";
import {useSelector} from "react-redux";

const Messages = () => {
	const {items} = useSelector(state => state.user.user)
	const [data, setData] = useState([])
	const [loadingPage, setLoadingPage] = useState(false)

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

	if (loadingPage) {
		return <div>
			<p>Загрузка...</p>
		</div>
	}

	return (
		<div>
			<div className="messages_header flex">
				{/*<Checkbox/>*/}
				{/*<select>*/}
				{/*  <option value="">1</option>*/}
				{/*  <option value="">2</option>*/}
				{/*  <option value="">3</option>*/}
				{/*</select>*/}
				{/*<select>*/}
				{/*  <option value="">1</option>*/}
				{/*  <option value="">2</option>*/}
				{/*  <option value="">3</option>*/}
				{/*</select>*/}
			</div>

			<div className="messages_list">
				{data.length > 0 ? data.map((item, index) => (
					<NavLink to={`?adId=${item[0].id}&senderId=${items.id === item[1].id ? item[1].id : item[0].user.id}&receiverId=${items.id !== item[0].user.id ? item[0].user.id : item[1].id}#chat-${uuidV4()}`}>
						<MessageItem data={item[0]} seller={item[0].user}
												 status={item[0].statusAd.name} image={item[0].previewImageAds[0]?.name}/>
					</NavLink>
				)) : <p>Пока нет сообщений</p>}
			</div>

			{/*<SelectedMessages/>*/}
		</div>
	);
};

export default Messages;