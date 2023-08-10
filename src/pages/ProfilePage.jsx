import React, {useState} from 'react';
import '../components/profile/profile.css'
import ProfileCard from "../components/profile/profileCard";
import avatar from "../asserts/profile/profile_avatar.png"
import Ad from "../components/cards/Ad";
import ProfileContentAd from "../components/profile/profile_content/profile_content_ad";

const ProfilePage = () => {

  const [choice, setChoice] = useState('ads');
  const [active, setActive] = useState('');

  return (
    <div className='container'>
      <div className="wrapper">
        <Ad/>
        <div className="flex">
          <div className="column">
            <ProfileCard avatar={avatar}/>
            <div className='w-315'></div>
          </div>
          <div className='profile_wrapper'>

            <div className="profile_links">
              <button className='profile_link semi_bold ' onClick={() => {
                setChoice('ads')
                setActive('active')
              }}>
                Мои объявления
              </button>
              <button className='profile_link semi_bold ' onClick={() => {
                setChoice('dialogs')
                setActive('active')
              }}>
                Сообщения
              </button>
              <button className='profile_link semi_bold ' onClick={() => {
                setChoice('favorites')
                setActive('active')
              }}>
                Избранное
              </button>
              <button className={'profile_link semi_bold'} onClick={() => {
                setChoice('help')
                setActive('active')
              }}>
                Помощь
              </button>
            </div>


            <div className='profile_content'>
              {
                choice === 'ads' ? <ProfileContentAd/> :
                  choice === 'dialogs' ? 'dialogs' :
                    choice === 'favorites' ? 'favorites' :
                      choice === 'help' ? 'help' : 'ничего не выбрано'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;