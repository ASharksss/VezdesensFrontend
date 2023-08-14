import React, {useState} from 'react';
import './myAd.css'
import ActiveAds from "./ActiveAds";
import ArchiveAd from "./ArchiveAd";

const ProfileContentAd = () => {

  const [typeAd, setTypeAd] = useState('activeAd')

  return (
    <div className='profile_content_ad'>
      <div className="flex space-between items-center">
        <div className="profile_content-link">
          <button onClick={() => setTypeAd('activeAd')}>Активные</button>
          <button onClick={() => setTypeAd('archiveAd')}>Архив</button>
        </div>
        <div className="filter">
          фильтр
        </div>
        <input type="text" className="profile_contend-search" placeholder='Поиск'/>
      </div>
      {
        typeAd === 'archiveAd' ? <ArchiveAd/> :
          typeAd === 'activeAd' ? <ActiveAds/> : 'нишо'
      }
    </div>
  );
};

export default ProfileContentAd;