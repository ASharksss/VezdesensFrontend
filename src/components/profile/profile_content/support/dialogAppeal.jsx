import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";

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

  const postMessage = async () => {
    const info = {
      text: message,
      appealId: data[0]?.appeal.id,

    }
    await axios.post(`api/support/createMessage`, info)
      .then(window.location.reload())
  }

  const postMessageSupport = async () => {
    const info = {
      text: response,
      appealId: data[0]?.appeal.id,
      isSupport: true
    }
    await axios.post(`api/support/createMessage`, info)
      .then(window.location.reload())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h1>{data[0]?.appeal.topicOfAppeal.name}</h1>
      {
        data.map((item, index) => (
            <p key={`message-${index}`} className={item.isSupport ? 'red' : 'black'}>{item.text}</p>
          )
        )
      }

      <input type="text" placeholder='ответ поддержки' value={response}
             onChange={e => setResponse(e.target.value)}/>
      <button onClick={postMessageSupport}>Отправить</button>

      <input type="text" placeholder='вопрос пользователя' value={message}
             onChange={e => setMessage(e.target.value)}/>
      <button onClick={postMessage}>Отправить</button>
    </div>
  );
};

export default DialogAppeal;