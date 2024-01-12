import React from 'react';
import messages from '../../asserts/icons/messages_icon.svg'
import favorite from '../../asserts/icons/favorite_icon.svg'
import support from '../../asserts/icons/support_icon.svg'
import {NavLink, useNavigate} from "react-router-dom";
import profile_avatar from "../../asserts/profile/profile_avatar61.svg"
import {useSelector} from "react-redux";

const SubMenu = () => {
  const navigate = useNavigate()

  const {isAuth, user} = useSelector(state => state.user)

  const isLoading = user.status === 'loading'

  const handleExit = () => {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      navigate('/')
    }
    window.location.reload()
  }

  return (
    <div className='subMenu_wrapper'>
      <div className='subMenu'>
        <div className="subMenu_avatar">
          <img src="" alt="" className='subMenu-img'/>
          <div className="subMenu_avatar-info">
            <img src={profile_avatar} alt=""/>
            <div className='subMenu_info'>
              {
                !isLoading ?
                  <NavLink to={`/profile/${user.items.id}#ads`}>
                    <p className='subMenu_info-title'>{user.items.name}</p>
                  </NavLink> : null
              }
              <p className='subMenu_info-phone'>{user.items.phone}</p>
            </div>
          </div>
        </div>
        <div className="subMenu_list">
          <div>
            <div className='submenu_list-wrapper'>
              <NavLink to={`/profile/${user.items.id}#dialogs`} className="subMenu_list-item flex">
                <img src={messages} alt="" className='subMenu_list-icon'/>
                <p>Сообщения</p>
              </NavLink>
            </div>
            <div className='submenu_list-wrapper'>
              <NavLink to={`/profile/${user.items.id}#favorites`} className="subMenu_list-item flex">
                <img src={favorite} alt="" className='subMenu_list-icon'/>
                <p>Избранное</p>
              </NavLink>
            </div>
            <div className='submenu_list-wrapper'>
              <NavLink to={`/profile/${user.items.id}#help`} className="subMenu_list-item flex">
                <img src={support} alt="" className='subMenu_list-icon'/>
                <p>Поддержка</p>
              </NavLink>
            </div>
            <div className="submenu_list-wrapper subMenu_list-item">
              <NavLink to='/'>
                <p className='subMenu_list-exit' onClick={handleExit}>Выйти</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;