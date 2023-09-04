import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addMessage} from "../../../../redux/slices/chatSlice";


const Dialog = () => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      chatId: 1,
      userId:1,
      text: value
    }
    dispatch(addMessage(data))
  }

  return (
    <div className='dialog'>
      <div className="messages">
        {
          messages.map(mess =>
            <div key={mess.id}>{mess.message}</div>
          )}
      </div>
      <div className="area_input">
        <input type="text" value={value}
               onChange={e => setValue(e.target.value)}/>
        <button onClick={handleSubmit}>Отправить</button>
      </div>
    </div>
  );
};

export default Dialog;