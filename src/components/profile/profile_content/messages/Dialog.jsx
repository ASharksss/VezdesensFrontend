import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addMessage} from "../../../../redux/slices/chatSlice";
import axios from "axios";
import MessageItem from "./message-item";


const Dialog = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()


  return (
    <div className='dialog'>

      <div className="messages">

      </div>
      <div className="area_input">
        <input type="text" value={value}
               onChange={e => setValue(e.target.value)}/>
        <button>Отправить</button>
      </div>
    </div>
  );
};

export default Dialog;