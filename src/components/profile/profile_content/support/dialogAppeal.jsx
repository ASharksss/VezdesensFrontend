import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";

import attach_icon from '../../../../asserts/messages/attach_icon.svg'
import send_icon from '../../../../asserts/messages/send_icon.svg'

const DialogAppeal = () => {

  const [data, setData] = useState([])
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const appealId = searchParams.get('id')
  const getData = async () => {
    await axios.get(`api/support/getMessagesOfAppeal?id=${appealId}`)
      .then(res => setData(res.data))
  }

  const postMessage = async (event) => {
    event.preventDefault()
    const info = {
      text: message,
      appealId: appealId,

    }
    await axios.post(`api/support/createMessage`, info)
      .then(async () => {
        await getData()
        setMessage('')
      })
  }

  const postMessageSupport = async () => {
    const info = {
      text: response,
      appealId: appealId,
      isSupport: true
    }
    await axios.post(`api/support/createMessage`, info)
      .then(window.location.reload())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='messages_container'>
      <div className='flex space-between items-center'>
        <h1 className='dialog_appeal-title'>Тема обращения: {data[0]?.appeal.topicOfAppeal.name}</h1>
        <button className='dialog_appeal-btn'>Вопрос решен</button>
      </div>
      <div className='flex column dialog_appeal-messages'>
        {
          data.map((item, index) => (
              <>
                <span
                  className={`${item.isSupport ? 'support-text text-left' : 'user_text text-right'}`}>{item.isSupport ? 'Техническая поддержка' : 'Вы'}</span>
                <div key={`message-${index}`}
                     className={`message_appeal_block ${item.isSupport ? 'left_message' : 'right_message'}`}>

                  <div>{item.text}</div>
                </div>
              </>

            )
          )
        }
      </div>
      <form className="dialogs-form" onSubmit={postMessage}>
        <textarea rows="1" className="dialogs-input" placeholder="Ваше сообщение..." value={message}
                  onChange={e => setMessage(e.target.value)}></textarea>
        <button type="submit" className="dialogs-sendBtn blocked"></button>
      </form>


      {/*<input type="text" placeholder='ответ поддержки' value={response}
             onChange={e => setResponse(e.target.value)}/>
      <button onClick={postMessageSupport}>Отправить</button>
*/}
    </div>
  );
};

export default DialogAppeal;