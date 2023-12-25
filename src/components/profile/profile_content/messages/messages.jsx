import React from 'react';
import './messages.css'
import Checkbox from "../../../../ui/checkbox";
import MessageItem from "./messageItem";
import SelectedMessages from "./selectedMessages";
import {NavLink} from "react-router-dom";

const Messages = () => {
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
				<p>Пока нет сообщений</p>
        <NavLink to='/myProfile/messages'>
          <MessageItem/>
        </NavLink>
        <NavLink to='/myProfile/messages'>
          <MessageItem/>
        </NavLink>
        <NavLink to='/myProfile/messages'>
          <MessageItem/>
        </NavLink>
      </div>

      {/*<SelectedMessages/>*/}
    </div>
  );
};

export default Messages;