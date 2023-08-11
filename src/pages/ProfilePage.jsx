import React, {useState} from 'react';
import '../components/profile/profile.css'
import ProfileCard from "../components/profile/profileCard";
import avatar from "../asserts/profile/profile_avatar.png"
import news from "../asserts/profile/newsBanner.png"
import Ad from "../components/cards/Ad";
import ProfileContentAd from "../components/profile/profile_content/myAd/profile_content_ad";

const ProfilePage = () => {

  const [choice, setChoice] = useState('ads');

  const changeClass = (event) => {
    event.currentTarget.className += ' active'
  }

  return (
    <div className='container'>
      <div className="wrapper">
        <Ad/>
        <div className="flex profile_container">
          <div className="column">
            <ProfileCard avatar={avatar}/>
            <div className='news_banner'>
              <img src={news} alt="новостной баннер"/>
            </div>
          </div>
          <div className='profile_wrapper'>

            <div className="profile_links">
              <button className='profile_link semi_bold ' onClick={(event) => {
                setChoice('ads')
                changeClass(event)
              }}>
                Мои объявления
              </button>
              <button className='profile_link semi_bold ' onClick={(event) => {
                setChoice('dialogs')
                changeClass(event)
              }}>
                Сообщения
              </button>
              <button className='profile_link semi_bold ' onClick={(event) => {
                setChoice('favorites')
                changeClass(event)
              }}>
                Избранное
              </button>
              <button className={'profile_link semi_bold'} onClick={(event) => {
                setChoice('help')
                changeClass(event)
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