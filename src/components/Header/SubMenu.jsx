import React from 'react';
import messages from '../../asserts/icons/messages_icon.svg'
import favorite from '../../asserts/icons/favorite_icon.svg.svg'
import support from '../../asserts/icons/support_icon.svg.svg'

const SubMenu = () => {
  return (
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
          <div className="subMenu_list-item">
            <NavLink>
              <img src={messages} alt="" className='subMenu_list-icon'/>
            </NavLink>
            <p>Сообщения</p>
          </div>
          <div className="subMenu_list-item">
            <NavLink>
              <img src={favorite} alt="" className='subMenu_list-icon'/>
            </NavLink>
            <p>Избранное</p>
          </div>
          <div className="subMenu_list-item">
            <NavLink>
              <img src={support} alt="" className='subMenu_list-icon'/>
            </NavLink>
            <p>Поддержка</p>
          </div>
          <div className="subMenu_list-item">
            <NavLink>
              <p>Выйти</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;