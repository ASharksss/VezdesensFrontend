import React from 'react';
import messages from '../../asserts/icons/messages_icon.svg'
import favorite from '../../asserts/icons/favorite_icon.svg'
import support from '../../asserts/icons/support_icon.svg'
import {NavLink} from "react-router-dom";

const SubMenu = () => {
  return (
    <div className='subMenu_wrapper'>
      <div className='subMenu'>
        <div className="subMenu_avatar">
          <img src="" alt="" className='subMenu-img'/>
          <div className="subMenu_avatar-info">
            <p>Петров Петр</p>
            <p>+7 919 657-35-11</p>
          </div>
        </div>
        <div className="subMenu_list">
          <div className="subMenu_list">
            <div className="subMenu_list-item flex">
              <NavLink to='/'>
                <img src={messages} alt="" className='subMenu_list-icon'/>
              </NavLink>
              <p>Сообщения</p>
            </div>
            <div className="subMenu_list-item flex">
              <NavLink to='/'>
                <img src={favorite} alt="" className='subMenu_list-icon'/>
              </NavLink>
              <p>Избранное</p>
            </div>
            <div className="subMenu_list-item flex">
              <NavLink to='/'>
                <img src={support} alt="" className='subMenu_list-icon'/>
              </NavLink>
              <p>Поддержка</p>
            </div>
            <div className="subMenu_list-item">
              <NavLink to='/'>
                <p>Выйти</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SubMenu;