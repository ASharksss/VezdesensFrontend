import React from 'react';
import './profile_content.css'
import MyAd from "./myAd";

const ProfileContentAd = () => {
  return (
    <div className='profile_content_ad'>
      <div className="flex space-between items-center">
        <div className="profile_content-link">
          <button>Активные</button>
          <button>Архив</button>
        </div>
        <div className="filter">
          фильтр
        </div>
        <input type="text" className="profile_contend-search" placeholder='Поиск'/>
      </div>

      <MyAd/>
      <MyAd/>

  </div>
  );
};

export default ProfileContentAd;