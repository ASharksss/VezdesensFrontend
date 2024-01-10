import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {NavLink, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import DialogItem from "./dialogItem";
import sendSVG from '../../../../asserts/icons/send.svg'
import './messages.css'


const Dialog = () => {
	const chatContainerRef = useRef(null);
	const textareaRef = useRef(null);
	const [searchParams, setSearchParams] = useSearchParams()
	const paramsSenderId = searchParams.get('senderId')
	const paramsReceiverId = searchParams.get('receiverId')
	const paramsAdId = searchParams.get('adId')
	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isConnected, setIsConnected] = useState(null)
	const [socket, setSocket] = useState(null)
	const [messages, setMessages] = useState([]);
	const {user} = useSelector(state => state.user)

	function connect() {
		setSocket(io(`http://localhost:5001/?senderId=${paramsSenderId}&receiverId=${paramsReceiverId}&adId=${paramsAdId}`));
	}

	useEffect(() => {
		if (paramsAdId !== null && paramsSenderId !== null && paramsReceiverId !== null && socket === null) {
			connect()
		}
	}, [])

	useEffect(() => {
		// Автоматическая прокрутка вниз после каждого обновления сообщений
		chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
	}, [messages]);

	const handleSubmit = (event) => {
		event.preventDefault();
		setValue('')
		socket.timeout(100).emit('message', value, () => {
			textareaRef.current.style.height = '37px'
		});
	}

	const handleKeyDownForSend = (event) => {
		if ((event.ctrlKey && event.key === 'Enter') && value.trim() !== '') {
			event.preventDefault();
			handleSubmit(event)
		}
	};

	const handleChangeValue = (event) => {
		setValue(event.target.value)
		event.target.style.height = `auto`;
		event.target.style.height = `${textareaRef.current.scrollHeight}px`;
	}

	useEffect(() => {
		if (isConnected) {
			setMessages([])
			socket.emit('getMessages')
			socket.on('getMessages', (data) => {
				setMessages(data)
			})
		}
	}, [isConnected])

	useEffect(() => {
		if (value.trim() === '') {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [value])

	useEffect(() => {
		if (socket !== null) {
			setIsConnected(socket.connected)
			socket.connect();
			socket.on('message', (data) => {
				setMessages(prev => [...prev, data])
			})
		}
	}, [socket])

	useEffect(() => {
		if (isConnected !== null && socket !== null) {
			function onConnect() {
				setIsConnected(true);
			}

			function onDisconnect() {
				setIsConnected(false);
			}

			socket.on('connect', onConnect);
			socket.on('disconnect', onDisconnect);

			return () => {
				socket.off('connect', onConnect);
				socket.off('disconnect', onDisconnect);
			};
		}
	}, [isConnected, socket]);


	return (<div className='dialog'>
			<NavLink to={'#dialogs'} className={'dialogs-backBtn'}>Назад</NavLink>

			<div className="messages_container">
				<div className="messages_list" ref={chatContainerRef}>
					{messages.length > 0 ? messages.map((item, index) => (
							<DialogItem name={'Имя'} text={item.text} date={item.createdAt} sender={item.senderId === user.items.id ? 'me' : 'client'}/>)) :
						<p>Нет сообщений</p>}
				</div>
				<form className="dialogs-form" onSubmit={handleSubmit}>
				<textarea rows="1" value={value} className="dialogs-input"
									placeholder={'Ваше сообщение...'}
									ref={textareaRef}
									onKeyDown={handleKeyDownForSend}
									onChange={handleChangeValue}>

				</textarea>
					<button disabled={isLoading} type="submit" className={`dialogs-sendBtn${isLoading ? ' blocked' : ''}`}>
						<img src={sendSVG} alt="Отправить"/>
					</button>
				</form>
			</div>
		</div>);
};

export default Dialog;