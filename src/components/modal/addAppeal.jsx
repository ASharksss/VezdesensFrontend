import React, {useEffect, useState} from 'react';
import button from "../../ui/buttons/button";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const AddAppeal = () => {
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [text, setText] = useState('')

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
      <select className='add_appeal-select'
              onChange={(e) => setTopic(e.target.value)}>
        <option disabled={true}>Выберите вариант...</option>
        {
          topics.map(item => (
            <option value={item.id}>{item.name}</option>
          ))
        }
      </select>
      <textarea className='add_appeal-textarea' value={text}
                onChange={(e) => setText(e.target.value)}></textarea>
      <button className='add_appeal-btn' onClick={addAppeal}>Содать обращени</button>
    </div>


  );
};

export default AddAppeal;