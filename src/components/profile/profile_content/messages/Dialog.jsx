import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {NavLink, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import MessageItem from "./dialogItem";


const Dialog = () => {
	const chatContainerRef = useRef(null);
	const [searchParams, setSearchParams] = useSearchParams()
	const paramsSenderId = searchParams.get('senderId')
	const paramsReceiverId = searchParams.get('receiverId')
	const paramsAdId = searchParams.get('adId')
	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [sender, setSender] = useState('')
	const [ad, setAd] = useState('')
	const [receiver, setReceiver] = useState('')
	const [isConnected, setIsConnected] = useState(null)
	const [socket, setSocket] = useState(null)
	const [messages, setMessages] = useState([]);
	const {user} = useSelector(state => state.user)

	function connect() {
		setSocket(io(`http://192.168.1.115:5001/?senderId=${paramsSenderId}&receiverId=${paramsReceiverId}&adId=${paramsAdId}`));
	}

	useEffect(() => {
		if (paramsAdId !== null && paramsSenderId !== null && paramsReceiverId !== null && socket === null) {
			connect()
		}
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		setValue('')
		socket.timeout(5000).emit('message', value, () => {
			setIsLoading(false);
		});
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


  return (
    <div className='dialog'>
			<NavLink to={'#dialogs'}>Назад</NavLink>

      <div className="messages">
				{messages.length > 0 ? messages.map((item, index) => (
					<MessageItem text={item.text} sender={item.senderId === user.items.id ? 'me' : 'client'}/>
				)) : <p>Нет сообщений</p>}
      </div>
      <form className="area_input" onSubmit={handleSubmit}>
        <input type="text" value={value} style={{border: '1px solid'}}
               onChange={e => setValue(e.target.value)}/>
        <button type={"submit"}>Отправить</button>
      </form>
    </div>
  );
};

export default Dialog;