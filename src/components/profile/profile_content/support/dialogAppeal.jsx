import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";

import attach_icon from '../../../../asserts/messages/attach_icon.svg'
import send_icon from '../../../../asserts/messages/send_icon.svg'

const DialogAppeal = ({isSupport}) => {

  const [data, setData] = useState([])
  const [message, setMessage] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const appealId = searchParams.get('id')

  const navigate = useNavigate()

  const getData = async () => {
    await axios.get(`api/support/getMessagesOfAppeal?id=${appealId}`)
      .then(res => setData(res.data))
  }

  const postMessage = async (event) => {
    event.preventDefault()
    const info = {
      text: message,
      appealId: appealId,
      isSupport
    }
    await axios.post(`api/support/createMessage`, info)
      .then(async () => {
        await getData()
        setMessage('')
      })
  }
  const closeAppeal = async () => {
    await axios.put('api/support/closeAppeal', {appealId})
      .then(() => navigate(`#help`))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='messages_container'>
      <div className='flex space-between items-center'>
        <h1 className='dialog_appeal-title'>Тема обращения: {data[0]?.appeal.topicOfAppeal.name}</h1>

        {
          data[0]?.appeal.statusOfAppealId === 1 ?
            <button className='dialog_appeal-btn' onClick={closeAppeal}>
              Вопрос решен
            </button> : null
        }

      </div>
      <div className='flex column dialog_appeal-messages'>
        {
          isSupport ?
            data.map((item, index) => (
              <>
                <span className={`${item.isSupport ? 'user_text text-right' : 'support-text text-left'}`}>
                  {item.isSupport ? 'Техническая поддержка' : item.appeal.user.name}
                </span>
                <div key={`message-${index}`}
                     className={`message_appeal_block ${item.isSupport ? 'right_message' : 'left_message'}`}>

                  <div>{item.text}</div>
                </div>
              </>
            ))
            :
          data.map((item, index) => (
              <>
                <span className={`${item.isSupport ? 'support-text text-left' : 'user_text text-right'}`}>
                  {item.isSupport ? 'Техническая поддержка' : item.appeal.user.name}
                </span>
                <div key={`message-${index}`}
                     className={`message_appeal_block ${item.isSupport ? 'left_message' : 'right_message'}`}>

                  <div>{item.text}</div>
                </div>
              </>
            ))
        }
      </div>


      <form className="dialogs-form" onSubmit={postMessage}>
        <div className="dialogs-input flex space-between">
          <textarea rows="1" placeholder="Ваше сообщение..." className='dialogs-textarea' value={message}
                    onChange={e => setMessage(e.target.value)}>
        </textarea>
          <img src={attach_icon} alt=""/>
        </div>

        <button type="submit" className="dialogs-sendBtn blocked">
          <img src={send_icon} alt=""/>
        </button>
      </form>

      {/*

      <input type="text" placeholder='ответ поддержки' value={response}
             onChange={e => setResponse(e.target.value)}/>
      <button onClick={postMessageSupport}>Отправить</button>
*/}

    </div>
  );
};

export default DialogAppeal;
